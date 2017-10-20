import * as GettingStartedTpl from './getting-started.html';
import * as GettingStartedSyl from './getting-started.scss';
import { Component } from "@angular/core";

@Component({
    selector: 'getting-started',
    template: GettingStartedTpl,
    styles: [GettingStartedSyl]
})

// partof: #SPC-getting-started
export class GettingStartedComponent {
    goToCurrentLevel() {
        //todo
    }
}