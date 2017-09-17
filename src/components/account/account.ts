import * as AccTpl from './account.html';
import * as AccSyl from './account.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'account',
    template: AccTpl,
    styles: [AccSyl]
})

export class AccountComponent {

    username: string;
    isEmail: Observable<boolean>;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.username = angularFireAuth.auth.currentUser.displayName;
        this.isEmail = angularFireAuth.authState.map(x => x.providerData[0].providerId == 'password');
    }

}
