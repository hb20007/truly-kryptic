/**
 * The buttons to login/sign-up with google and facebook
 * work for both logging in and the initial sign up.
 * 
 * Thus the auth provider buttons can be reused in both the login and sign up page
 */

import * as ProviderAuthTpl from './provider-auth.html';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import * as firebase from 'firebase/app';

@Component({
    selector: 'provider-auth',
    template: ProviderAuthTpl,
})
export class ProviderAuthComponent {
    constructor(private angularFireAuth: AngularFireAuth) { }

    googleSignUp() {
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    facebookSignUp() {
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
}