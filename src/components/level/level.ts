import * as LevelTpl from './level.html';
import * as LevelSyl from './level.scss';
import { Component, OnInit, Renderer } from "@angular/core";
import { Observable } from 'rxjs/Observable';
// import * as firebase from "firebase/app";
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as levels from '../../../Notes/levels.json';
import { isTouchDevice } from '../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
// import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { LevelService } from './level.service';

// let levels = [];

export type LevelIndices = { levelIndex: number; sublevelIndex: number };

@Component({
    selector: 'level',
    template: LevelTpl,
    styles: [LevelSyl]
})
// Implements: #SPC-level
export class LevelComponent implements OnInit {

    latestWrongGuess = '';

    submissionStatus: 'waiting' | 'correct-answer' | 'correct-hint' | 'wrong' | undefined;

    imgHintDir = '/img/hints/';
    fields = { answer: '' };

    indices: Observable<LevelIndices>;
    inputFocused = true;

    prevIndices: Observable<LevelIndices>;
    nextIndices: Observable<LevelIndices>;

    isLastLevel: Observable<Boolean>;

    basicInfo: Observable<BasicLevelInfo>;

    hints: Observable<Hint[]>;
    guesses: Observable<Guess[]>;

    completedWithAnswer: Observable<String>;

    constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
        private levelService: LevelService, private renderer: Renderer) { }

    ngOnInit() {
        this.indices = this.route.paramMap.map(params => ({
            levelIndex: Number(params.get('level_id')),
            sublevelIndex: Number(params.get('sublevel_id')),
        }));
        this.nextIndices = this.levelService.nextSublevelInd(this.indices);
        this.prevIndices = this.levelService.prevSublevelInd(this.indices);

        this.isLastLevel = this.nextIndices.map(ind => ind === undefined);

        this.guesses = this.levelService.levelGuesses(this.indices);

        this.basicInfo = this.levelService.basicLevelInfo(this.indices);
        this.hints = this.levelService.levelHints(this.indices);

        this.completedWithAnswer = this.levelService.levelAnswer(this.indices);

        this.indices.subscribe(() => {
            this.fields.answer = '';
            this.submissionStatus = undefined;
            this.inputFocused = false;
        });

        if (!isTouchDevice()) {
            this.focusInput();
        }
    }

    focusInput() {
        this.renderer.invokeElementMethod(document.querySelector('#answer'), 'focus', []);
    }

    getBackgroundUrl(image) {
        return this.sanitizer.bypassSecurityTrustStyle(`url("${this.imgHintDir + image}")`);
    }

    onKey(keyCode) {
        if (!this.inputFocused) {
            if (keyCode == '37') {
                this.openLevelLink(this.prevIndices);
            } else if (keyCode == '39') {
                this.openNextLevelIfCompleted();
            }
        }
    }

    openLevelLink(indices: Observable<LevelIndices>) {
        indices.first().toPromise().then(indices => {
            if (indices) {
                this.router.navigateByUrl(`/level/${indices.levelIndex}/${indices.sublevelIndex}`);
            }
        });
    }

    openNextLevelIfCompleted() {
        this.completedWithAnswer.first().toPromise().then(completed => {
            if (completed) {
                this.submissionStatus = undefined;

                this.isLastLevel.first().toPromise().then(last => {
                    // we've finished the last level!
                    if (last) {
                        this.levelService.hofEntry().first().toPromise().then(entry => {
                            if (entry.$exists()) {
                                this.router.navigateByUrl('/hof');
                            } else {
                                this.router.navigateByUrl('/hof-form');
                            }
                        });
                    } else {
                        this.openLevelLink(this.nextIndices);
                    }
                });
            }
        });
    }

    // Implements: #SPC-level-solution_input
    submitAnswer() {
        let guessValue = this.fields.answer;

        if (guessValue) {
            this.submissionStatus = 'waiting';
            this.latestWrongGuess = '';


            this.levelService.submitAnswer(this.fields.answer, this.indices).then(secret => {
                if (secret) {
                    this.fields.answer = '';

                    if (typeof secret == 'object') {
                        this.submissionStatus = 'correct-hint';
                    } else if (secret === true) {
                        this.submissionStatus = 'correct-answer';
                    }
                } else {
                    this.submissionStatus = 'wrong';
                    this.latestWrongGuess = guessValue;
                    this.fields.answer = '';
                }
            }).catch(e => this.submissionStatus = undefined);
        }
    }
}
