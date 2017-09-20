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
    fields = { currentPassword: '', password: '', confirmPassword: '' };
    submissionError = '';
    username: string;
    hasEmail: boolean;
    email: string;
    clickable: boolean = false;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.username = angularFireAuth.auth.currentUser.displayName;
        this.hasEmail = angularFireAuth.auth.currentUser.providerData[0].providerId == 'password';
        if (this.hasEmail)
            this.email = angularFireAuth.auth.currentUser.email;
    }

    toggleDelete(event) {
        this.clickable = event.target.checked;
    }

    deleteUser() {
        this.angularFireAuth.auth.currentUser.delete();
    }

    logUserIn() {
        if (this.fields.currentPassword == '' || this.fields.confirmPassword == '' || this.fields.password == '')
            this.submissionError = 'Please fill in the required fields';
        else {
            this.angularFireAuth.auth.signInWithEmailAndPassword(this.email, this.fields.currentPassword)
                .then(() => {
                    this.fields.currentPassword = '';
                    this.changePass();
                }).catch((err: any) => {
                switch (err.code) {
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

    changePass() {
        if (this.fields.password == this.fields.confirmPassword) {
            this.angularFireAuth.auth.currentUser.updatePassword(this.fields.password)
                .then(() => {
                    this.fields.password = '';
                    this.fields.confirmPassword = '';
                    this.onAuthSuccess();
                }).catch((err: any) => {
                switch (err.code) {
                    case 'auth/weak-password':
                        this.submissionError = 'Weak Password';
                        break;
                    default:
                        this.submissionError = 'Unknown Error';
                }
                throw err;
            });
        }
        else this.submissionError = 'Passwords do not match';
    }

    onAuthSuccess() {
        this.submissionError = 'Password changed successfully';
    }
}
