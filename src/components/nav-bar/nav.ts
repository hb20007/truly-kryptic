import * as NavTpl from './nav.html';
import * as NavSyl from './nav.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from "@angular/core";
import 'rxjs/add/operator/map';

@Component({
    selector: 'nav-bar',
    template: NavTpl,
    styles: [NavSyl],
    host: {'(window:scroll)': 'toggleShrink()'}
})

export class NavbarComponent {

    constructor(private angularFireAuth: AngularFireAuth) {}

    getLoginState() {
        return this.angularFireAuth.authState.subscribe();
    }

    toggleShrink() {
        return window.pageYOffset > 100;
    }
}
