import { Component } from '@angular/core';
import * as AppTpl from './app.html';
import * as AppSyl from './app.scss';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'app-root',
    template: AppTpl,
    styles: [AppSyl],
})
export class AppComponent {
    inited = false;

    constructor(private angularFireAuth: AngularFireAuth) {
        // don't show the app until firebase has tried to authenticate to prevent
        // flashes due to auth-dependant content
        angularFireAuth.authState.subscribe(() => {
            this.inited = true;
        });
    }
}

