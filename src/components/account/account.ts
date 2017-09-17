import * as AccTpl from './account.html';
import * as AccSyl from './account.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import 'rxjs/add/operator/map';

@Component({
    selector: 'account',
    template: AccTpl,
    styles: [AccSyl]
})

export class AccountComponent {

    username: string;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.username = angularFireAuth.auth.currentUser.displayName;
        console.log(this.username);
    }

}
