import * as LevelListTpl from './level-list.html';
import * as LevelListSyl from './level-list.scss';
import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { getLevelNumber } from '../../shared';
import { AngularFireDatabase } from 'angularfire2/database';
import { LevelService } from '../level/level.service';

@Component({
    selector: 'level-list',
    template: LevelListTpl,
    styles: [LevelListSyl]
})

// Implements: #SPC-level-list
export class LevelListComponent {
    levels: Observable<LevelSummary[]>;

    constructor(private levelService: LevelService) {
        this.levels = levelService.levelSummaries();
    }
}