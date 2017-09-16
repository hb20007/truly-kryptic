import * as SignUpFormTpl from './sign-up-form.html';
import * as SignUpFormSyl from './sign-up-form.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import * as firebase from 'firebase/app';

// partof: #SPC-landing-sign_up
@Component({
    selector: 'sign-up-form',
    template: SignUpFormTpl,
    styles: [SignUpFormSyl],
})
export class SignUpFormComponent {
    fields = { email: '', password: '' }
    submissionError = '';

    constructor(private angularFireAuth: AngularFireAuth) { }

    emailSignUp() {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(this.fields.email, this.fields.password)
            .then((res) => {
                console.log(res);
                this.fields.email = '';
                this.fields.password = '';
            });
    }
}