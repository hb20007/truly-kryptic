import * as HofTpl from './hof.html';
import * as HofSyl from './hof.scss';
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as orderBy from 'lodash/orderBy';

@Component({
    selector: 'hall-of-fame',
    template: HofTpl,
    styles: [HofSyl]
})

// partof: #SPC-hof
export class HallOfFameComponent implements OnInit {
    hofUsers: Array<HofUser>;

    constructor(private db: AngularFireDatabase) { }

    ngOnInit() {
        this.db.object('/hall-of-fame').$ref.once('value').then((hofUsers) => {
            let users = hofUsers.val() || {};
            this.hofUsers = orderBy(Object.keys(users).map(k => users[k]), 'datetime');
        });
    }
}