import * as LoginTpl from './login.html';
import * as LoginSyl from './login.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// partof: #SPC-login
@Component({
    selector: 'login',
    template: LoginTpl,
    styles: [LoginSyl],
})
export class LoginComponent {
    fields = { email: '', password: '' }
    submissionError = '';

    constructor(private router: Router, private angularFireAuth: AngularFireAuth) { }

    emailLogin() {
        this.submissionError = '';

        this.angularFireAuth.auth.signInWithEmailAndPassword(this.fields.email, this.fields.password)
            .then(() => {
                this.fields.email = '';
                this.fields.password = '';
                this.router.navigateByUrl('/levels');
            }).catch((err: any) => {
                switch (err.code) {
                    case 'auth/invalid-email':
                        this.submissionError = 'Invalid Email Address';
                        break;
                    case 'auth/wrong-password':
                        this.submissionError = 'Wrong Password';
                        break;
                    default:
                        this.submissionError = 'Unknown Error';
                }
                throw err;
            });
    }
}