import * as LoginTpl from './login.html';
import * as LoginSyl from './login.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';

// partof: #SPC-login
@Component({
    selector: 'login',
    template: LoginTpl,
    styles: [LoginSyl],
})
export class LoginComponent {
    fields = { email: '', password: '' }

    constructor(private angularFireAuth: AngularFireAuth) { }

    emailLogin() {
        this.angularFireAuth.auth.signInWithEmailAndPassword(this.fields.email, this.fields.password)
            .then((res) => {
                console.log(res);
                this.fields.email = '';
                this.fields.password = '';
            });
    }
}