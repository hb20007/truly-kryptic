import * as LoginTpl from './login.html';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import * as firebase from 'firebase/app';

// partof: #SPC-login
@Component({
    selector: 'login',
    template: LoginTpl,
})
export class LoginComponent {
    form = { email: '', password: '' }

    constructor(private angularFireAuth: AngularFireAuth) { }

    emailLogin() {
        this.angularFireAuth.auth.signInWithEmailAndPassword(this.form.email, this.form.password)
            .then((res) => {
                console.log(res);
                this.form.email = '';
                this.form.password = '';
            });
    }
}