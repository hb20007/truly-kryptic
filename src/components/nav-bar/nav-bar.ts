import * as NavTpl from './nav-bar.html';
import * as NavSyl from './nav-bar.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase/app";

@Component({
    selector: 'nav-bar',
    template: NavTpl,
    styles: [NavSyl],
    host: {'(window:scroll)': 'toggleShrink()'}
})

export class NavbarComponent {

    user: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.user = angularFireAuth.authState;
    }

    getLoginState() {

    }

    toggleShrink() {
        return window.pageYOffset > 100;
    }
}
