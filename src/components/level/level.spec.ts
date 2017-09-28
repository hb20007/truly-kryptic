import '../../test-utils';
import { TestBed } from '@angular/core/testing';
import { LevelComponent } from './level';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireDatabase } from 'angularfire2/database';
import { RouterLinkStubDirective } from '../../test-utils';

describe('Landing-page Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LevelComponent, RouterLinkStubDirective],
            providers: [
                { provide: ActivatedRoute, useValue: {} },
                { provide: Router, useValue: {} },
                { provide: DomSanitizer, useValue: {} },
                { provide: AngularFireDatabase, useValue: {} },
                { provide: AngularFireAuth, useValue: {} },
            ],
        }).compileComponents();
    });

    it('works', () => {
        // let comp = TestBed.createComponent(LevelComponent).componentInstance;
        // expect(comp).toBeDefined();
    });
});

