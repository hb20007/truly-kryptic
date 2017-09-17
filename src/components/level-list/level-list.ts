import * as LevelListTpl from './level-list.html';
import * as LevelListSyl from './level-list.scss';
import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'level-list',
    template: LevelListTpl,
    styles: [LevelListSyl]
})

// Implements: #SPC-level-list
export class LevelListComponent {

    user: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.user = angularFireAuth.authState;
    }
}