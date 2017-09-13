import * as SignUpFormTpl from './sign-up-form.html';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import * as firebase from 'firebase/app';

@Component({
    selector: 'sign-up-form',
    template: SignUpFormTpl,
})
export class SignUpFormComponent {
    constructor(private angularFireAuth: AngularFireAuth) { }

    googleSignUp() {
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
}