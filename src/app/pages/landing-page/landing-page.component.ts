import * as LandingTpl from './landing-page.component.html';
import * as LandingSyl from './landing-page.component.scss';
import { Component } from "@angular/core";

// console.log(LandingSyl);
// var LandingSyl = '';

@Component({
    selector: 'landing-page',
    template: LandingTpl,
    styles: [LandingSyl],
})

export class LandingpageComponent {

}