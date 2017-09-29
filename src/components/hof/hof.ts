import * as HofTpl from './hof.html';
import * as HofSyl from './hof.scss';
import { Component } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'hall-of-fame',
    template: HofTpl,
    styles: [HofSyl]
})

// partof: #SPC-hof
export class HallOfFameComponent {
    hofUsers: Array<hofUser>;
}