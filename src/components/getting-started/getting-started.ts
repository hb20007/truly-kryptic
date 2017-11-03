import * as GettingStartedTpl from './getting-started.html';
import * as GettingStartedSyl from './getting-started.scss';
import { Component } from "@angular/core";
import {LevelService} from "../level/level.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'getting-started',
    template: GettingStartedTpl,
    styles: [GettingStartedSyl]
})

// partof: #SPC-getting-started
export class GettingStartedComponent {
    currentLevelLink: Observable<String>;

    constructor(private levelService: LevelService) {
        this.currentLevelLink = this.levelService.userId && this.levelService.currentLevelLink();
    }
}