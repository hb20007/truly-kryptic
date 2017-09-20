import * as LevelTpl from './level.html';
import * as LevelSyl from './level.scss';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import * as levels from '../../../Notes/levels.json';
import { getLevelNumber } from '../../shared';
import { ActivatedRoute, Router } from '@angular/router';

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

    levelIndices: Observable<{ levelIndex: number, sublevelIndex: number }>

    constructor(private route: ActivatedRoute, private router: Router) { }

    onKey(keyCode) {
        if (keyCode == '37') {
            this.openPrevLevel && this.openPrevLevel();
        } else if (keyCode == '39') {
            this.openNextLevel && this.openNextLevel();
        }
    }

    ngOnInit() {
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
    }
}