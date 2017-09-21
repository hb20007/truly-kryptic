import * as NavTpl from './nav-bar.html';
import * as NavSyl from './nav-bar.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase/app";
import { Router } from '@angular/router';

@Component({
    selector: 'nav-bar',
    template: NavTpl,
    styles: [NavSyl],
    host: {'(window:scroll)': 'toggleShrink()'}
})

export class NavbarComponent {

    user: Observable<firebase.User>;

    constructor(private router: Router, private angularFireAuth: AngularFireAuth) {
        this.user = angularFireAuth.authState;
    }

    signOut() {
        this.angularFireAuth.auth.signOut().then(() => {
            this.router.navigateByUrl('/');
        });
    }

    toggleShrink() {
        return window.pageYOffset > 25;
    }
}
