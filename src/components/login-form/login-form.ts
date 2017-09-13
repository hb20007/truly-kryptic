import * as LoginFormTpl from './sign-up-form.html';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import * as firebase from 'firebase/app';

// partof: #SPC-landing-sign_up
@Component({
    selector: 'sign-up-form',
    template: LoginFormTpl,
})
export class LoginFormComponent {
    form = { email: '', password: '' }

    constructor(private angularFireAuth: AngularFireAuth) { }

    emailLogin() {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then((res) => {
                console.log(res);
                this.form.email = '';
                this.form.password = '';
            });
    }

    googleLogin() {
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    facebookLogin() {
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
}