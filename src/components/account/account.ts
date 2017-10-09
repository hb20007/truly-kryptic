import * as AccTpl from './account.html';
import * as AccSyl from './account.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import { Router } from '@angular/router';

@Component({
    selector: 'account',
    template: AccTpl,
    styles: [AccSyl]
})

export class AccountComponent {
    fields = { currentPassword: '', password: '', confirmPassword: '' };

    deleteFields = { verify: false, password: '' };

    changePasswordSubmissionError = '';
    deleteAccountSubmissionError = '';

    username: string;
    hasEmail: boolean;
    email: string;

    constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
        this.username = angularFireAuth.auth.currentUser.displayName;
        this.hasEmail = angularFireAuth.auth.currentUser.providerData[0].providerId == 'password';
        if (this.hasEmail)
            this.email = angularFireAuth.auth.currentUser.email;
    }

    reauthAndDeleteUser() {
        if (this.deleteFields.verify) {
            if (this.deleteFields.password == '')
                this.deleteAccountSubmissionError = 'Please enter your current password'; 
            else {
                this.angularFireAuth.auth.signInWithEmailAndPassword(this.email, this.deleteFields.password)
                    .then(() => {
                        this.deleteFields.password = '';
                        this.deleteUser();
                        this.router.navigateByUrl('/');
                    }).catch((err: any) => {
                    switch (err.code) {
                        case 'auth/wrong-password':
                            this.deleteAccountSubmissionError = 'Wrong Password';
                            break;
                        default:
                            this.deleteAccountSubmissionError = 'Unknown Error';
                    }
                    throw err;
                });
            }
        }
    }

    // Implements: #SPC-account-delete
    deleteUser() {
        this.angularFireAuth.auth.currentUser.delete();
    }

    reauthAndChangePass() {
        if (this.fields.currentPassword == '' || this.fields.confirmPassword == '' || this.fields.password == '')
            this.changePasswordSubmissionError = 'Please fill in the required fields';
        else if (this.fields.confirmPassword != this.fields.password) {
            this.changePasswordSubmissionError = 'Passwords do not match';
        }
        else {
            this.angularFireAuth.auth.signInWithEmailAndPassword(this.email, this.fields.currentPassword)
                .then(() => {
                    this.fields.currentPassword = '';
                    this.changePass();
                }).catch((err: any) => {
                switch (err.code) {
                    case 'auth/wrong-password':
                        this.changePasswordSubmissionError = 'Wrong Password';
                        break;
                    default:
                        this.changePasswordSubmissionError = 'Unknown Error';
                }
                throw err;
            });
        }
    }

    // Implements: #SPC-account-change_password
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
                        this.changePasswordSubmissionError = 'Weak Password';
                        break;
                    default:
                        this.changePasswordSubmissionError = 'Unknown Error';
                }
                throw err;
            });
        }
        else this.changePasswordSubmissionError = 'Passwords do not match';
    }

    onAuthSuccess() {
        this.changePasswordSubmissionError = 'Password changed successfully';
    }
}
