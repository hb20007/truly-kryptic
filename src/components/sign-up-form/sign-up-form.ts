import * as SignUpFormTpl from './sign-up-form.html';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import * as firebase from 'firebase/app';

// partof: #SPC-landing-sign_up
@Component({
    selector: 'sign-up-form',
    template: SignUpFormTpl,
})
export class SignUpFormComponent {
    form = { email: '', password: '' }

    constructor(private angularFireAuth: AngularFireAuth) { }

    emailSignUp() {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then((res) => {
                console.log(res);
                this.form.email = '';
                this.form.password = '';
            });
    }

    googleSignUp() {
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    facebookSignUp() {
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
}