import * as LevelTpl from './level.html';
import * as LevelSyl from './level.scss';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import * as levels from '../../../Notes/levels.json';
import { getLevelNumber } from '../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import "rxjs/add/operator/combineLatest";

@Component({
    selector: 'level',
    template: LevelTpl,
    styles: [LevelSyl]
})
// Implements: #SPC-level
export class LevelComponent implements OnInit {

    imgHintDir = '/img/hints/';
    fields = { answer: '' };

    prevLevelLink: Observable<string | undefined>;
    nextLevelLink: Observable<string | undefined>;

    openPrevLevel: Function;
    openNextLevel: Function;

    level: Observable<Level>;
    levelNumber: Observable<String>;

    guesses: FirebaseListObservable<string[]>;
    levelAnswers: string[];

    hints: Observable<Hint[]>;

    answeredWrong: boolean;

    levelIndices: Observable<{ levelIndex: number, sublevelIndex: number }>

    onKey(keyCode) {
        if (keyCode == '37') {
            this.openPrevLevel && this.openPrevLevel();
        } else if (keyCode == '39') {
            this.openNextLevel && this.openNextLevel();
        }
    }

    submitAnswer() {
        this.answeredWrong = false;

        const guess = this.fields.answer.trim();
        if (guess) {
            this.guesses.push(guess);
        }

        const correct = this.levelAnswers.find(levelAnswer => this.fmtGuessOrAnswer(guess) == this.fmtGuessOrAnswer(levelAnswer));

        if (correct) {
            if (this.openNextLevel) {
                this.openNextLevel();
            } else {
                // todo, go to hall of fame form
            }
        } else {
            this.answeredWrong = true;
        }
    }

    fmtGuessOrAnswer(text) {
        return (text || "").replace(/[^A-Za-z0-9]/g, '').toLocaleLowerCase();
    }

    getBackgroundUrl(image) {
        return this.sanitizer.bypassSecurityTrustStyle(`url("${this.imgHintDir + image}")`);
    }


    constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
        private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {

        this.levelIndices = this.route.paramMap.map(params => ({
            levelIndex: Number(params.get('level_id')),
            sublevelIndex: Number(params.get('sublevel_id')),
        }));

        this.level = this.levelIndices.map(({ levelIndex, sublevelIndex }) => levels[levelIndex][sublevelIndex]);

        this.levelNumber = this.levelIndices.map(({ levelIndex, sublevelIndex }) =>
            getLevelNumber(levelIndex, sublevelIndex, levels[levelIndex].length));

        this.prevLevelLink = this.levelIndices.map(({ levelIndex, sublevelIndex }) => {
            let prevLevelIndex = sublevelIndex == 0 ? levelIndex - 1 : levelIndex;
            if (prevLevelIndex < 0) {
                return undefined;
            } else {
                let prevSublevelIndex = sublevelIndex == 0 ? levels[prevLevelIndex].length - 1 : sublevelIndex - 1;
                return `/level/${prevLevelIndex}/${prevSublevelIndex}`;
            }
        });

        this.nextLevelLink = this.levelIndices.map(({ levelIndex, sublevelIndex }) => {
            let maxSublevel = levels[levelIndex].length - 1;
            let nextLevelIndex = sublevelIndex == maxSublevel ? levelIndex + 1 : levelIndex;
            if (nextLevelIndex < 0) {
                return undefined;
            } else {
                let nextSublevelIndex = sublevelIndex == maxSublevel ? 0 : sublevelIndex + 1;
                return `/level/${nextLevelIndex}/${nextSublevelIndex}`;
            }
        });

        this.nextLevelLink.subscribe(url => this.openNextLevel = url && (() => this.router.navigateByUrl(url)));
        this.prevLevelLink.subscribe(url => this.openPrevLevel = url && (() => this.router.navigateByUrl(url)));

        this.levelIndices.subscribe(({ levelIndex, sublevelIndex }) => {
            const userId = this.angularFireAuth.auth.currentUser.uid.toString();
            const guessesDbPath = `${userId}/${levelIndex}/${sublevelIndex}/guesses`;
            this.guesses = this.db.list(guessesDbPath);

            this.hints = this.guesses.combineLatest(this.level).map(([guesses, level]) => {
                return level.hints.map(hint => {
                    const activeTriggers = guesses
                        .map(g => g.$value.trim())
                        .reduce((guesses, guess) => {
                            const valid = hint.triggers &&
                                hint.triggers.some(tr => this.fmtGuessOrAnswer(guess) == this.fmtGuessOrAnswer(tr));
                            if (valid && guesses.indexOf(guess) === -1) {
                                guesses.push(guess);
                            }
                            return guesses;
                        }, []);

                    if (!hint.triggers || activeTriggers.length > 0) {
                        return { ...hint, triggers: activeTriggers };
                    } else {
                        return undefined;
                    }
                }).filter(Boolean)
            });
        });

        this.level.subscribe(level => this.levelAnswers = level.answers);
    }
}