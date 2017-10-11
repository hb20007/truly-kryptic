import '../../test-utils';
import { TestBed } from '@angular/core/testing';
import { LevelService } from './level.service';
// import { LevelComponent } from './level';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { ActivatedRoute, Router } from '@angular/router';
// import { DomSanitizer } from '@angular/platform-browser';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { RouterLinkStubDirective } from '../../test-utils';

describe('Landing-page Component', () => {
    beforeEach(() => {

        TestBed.configureTestingModule({
            // declarations: [LevelComponent, RouterLinkStubDirective],
            providers: [
                LevelService,
                // { provide: ActivatedRoute, useValue: {} },
                // { provide: Router, useValue: {} },
                // { provide: DomSanitizer, useValue: {} },
                // { provide: AngularFireDatabase, useValue: {} },
                // { provide: AngularFireAuth, useValue: {} },
            ],
        }).compileComponents();
    });

    it('gets the correct prev and next sublevel', () => {
        let levelService: LevelService = TestBed.get(LevelService);
        console.log(levelService.prevSublevel())
        // let comp = TestBed.createComponent(LevelComponent).componentInstance;
        // expect(comp).toBeDefined();
    });
});

