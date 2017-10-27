import * as HofFormTpl from './hof-form.html';
import * as HofFormSyl from './hof-form.scss';
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as orderBy from 'lodash/orderBy';
import { Router } from '@angular/router';
import { LevelService } from '../level/level.service';

@Component({
    selector: 'hall-of-fame-form',
    template: HofFormTpl,
    styles: [HofFormSyl]
})

// Implements: #SPC-level-completion
export class HallOfFameFormComponent {
    fields = { nickname: '', comment: '' };
    submissionError = undefined;

    constructor(private db: AngularFireDatabase, private router: Router, private levelService: LevelService) { }

    submitHofInfo() {
        this.submissionError = '';

        if (this.fields.nickname.length < 2) {
            this.submissionError = 'Name cannot be shorter than 2 characters.';
        } else if (!this.fields.comment) {
            this.submissionError = 'Your comment could be general feedback or your favorite level.';
        } else {
            this.levelService.submitHofInfo(this.fields.nickname, this.fields.comment)
                .then(() => this.router.navigateByUrl(`/hof`))
                .catch(e => this.submissionError = 'Unable to create Hall of Fame entry');
        }
    }
}