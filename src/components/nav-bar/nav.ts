import * as NavTpl from './nav.html';
import * as NavSyl from './nav.scss';
import { Component } from "@angular/core";

@Component({
    selector: 'nav-bar',
    template: NavTpl,
    styles: [NavSyl],
    host: {'(window:scroll)': 'toggleShrink()'}
})

export class NavbarComponent {
    toggleShrink(): boolean {
        return window.pageYOffset > 100;
    }
}
