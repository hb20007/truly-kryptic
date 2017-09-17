import * as LandingTpl from './landing.html';
import * as LandingSyl from './landing.scss';
import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'landing-page',
    template: LandingTpl,
    styles: [LandingSyl]
})

export class LandingpageComponent {

    user: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.user = angularFireAuth.authState;
    }
}