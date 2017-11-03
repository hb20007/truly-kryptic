import * as SignUpFormTpl from './sign-up-form.html';
import * as SignUpFormSyl from './sign-up-form.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { LevelService } from '../level/level.service';

// partof: #SPC-landing-sign_up
@Component({
    selector: 'sign-up-form',
    template: SignUpFormTpl,
    styles: [SignUpFormSyl],
})
export class SignUpFormComponent {
    fields = { email: '', password: '' };
    submissionError = '';

    constructor(private router: Router, private angularFireAuth: AngularFireAuth,
        private levelService: LevelService) { }

    emailSignUp() {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(this.fields.email, this.fields.password)
            .then(() => {
                this.fields.email = '';
                this.fields.password = '';
                this.onAuthSuccess();
            }).catch((err: any) => {
                switch (err.code) {
                    case 'auth/invalid-email':
                        this.submissionError = 'Invalid email address';
                        break;
                    case 'auth/email-already-in-use':
                        this.submissionError = 'Email address already in use.';
                        break;
                    case 'auth/weak-password':
                        this.submissionError = 'Password must be at least 6 characters.';
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