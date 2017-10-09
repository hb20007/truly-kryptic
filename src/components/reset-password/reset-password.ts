import * as ResetPasswordTpl from './reset-password.html';
import * as ResetPasswordSyl from './reset-password.scss';
import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'reset-password',
    template: ResetPasswordTpl,
    styles: [ResetPasswordSyl]
})

// partof: #SPC-login-reset_password
export class ResetPasswordComponent {

    // user: Observable<firebase.User>;

    // constructor(private angularFireAuth: AngularFireAuth) {
    //     this.user = angularFireAuth.authState;
    // }
}