import * as ResetPasswordTpl from './reset-password.html';
import * as ResetPasswordSyl from './reset-password.scss';
import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'reset-password',
    template: ResetPasswordTpl,
    styles: [ResetPasswordSyl]
})

// partof: #SPC-login-reset_password
export class ResetPasswordComponent {

    fields = { email: '' };
    submissionError = '';

    constructor(private router: Router, private angularFireAuth: AngularFireAuth) { }

    sendResetLink() {
        if (!this.fields.email) {
            this.submissionError = 'Please enter an email address.';
        } else {
            this.angularFireAuth.auth.sendPasswordResetEmail(this.fields.email).then(() => {
                this.submissionError = 'Password reset link sent.';
            });
        }
    }
}