import * as LoginTpl from './login.html';
import * as LoginSyl from './login.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { LevelService } from '../level/level.service';

// partof: #SPC-login
@Component({
    selector: 'login',
    template: LoginTpl,
    styles: [LoginSyl],
})
export class LoginComponent {
    fields = { email: '', password: '' };
    submissionError = '';

    constructor(private router: Router, private angularFireAuth: AngularFireAuth, private levelService: LevelService) {
        if (angularFireAuth.auth.currentUser) {
            this.onAuthSuccess();
        }
    }

    emailLogin() {
        this.submissionError = '';

        this.angularFireAuth.auth.signInWithEmailAndPassword(this.fields.email, this.fields.password)
            .then(() => {
                this.fields.email = '';
                this.fields.password = '';
                this.onAuthSuccess();
            }).catch((err: any) => {
                switch (err.code) {
                    case 'auth/user-not-found':
                    case 'auth/invalid-email':
                        this.submissionError = 'No user was found with that email address.';
                        break;
                    case 'auth/wrong-password':
                        this.submissionError = 'Wrong password';
                        break;
                    default:
                        this.submissionError = 'Unknown error';
                }
                throw err;
            });
    }

    onAuthSuccess() {
        this.levelService.currentLevelLink().first().toPromise().then(link => {
            this.router.navigateByUrl(link);
        });
    }
}