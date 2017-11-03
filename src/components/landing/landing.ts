import * as LandingTpl from './landing.html';
import * as LandingSyl from './landing.scss';
import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { LevelService } from '../level/level.service';
import { Router } from '@angular/router';

@Component({
    selector: 'landing-page',
    template: LandingTpl,
    styles: [LandingSyl]
})

// partof: #SPC-landing
export class LandingpageComponent { }