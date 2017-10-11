import '../../test-utils';
import { TestBed } from '@angular/core/testing';
import { LevelService } from './level.service';
import { levelsBasic } from './level.mocks';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// import { LevelComponent } from './level';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { ActivatedRoute, Router } from '@angular/router';
// import { DomSanitizer } from '@angular/platform-browser';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { RouterLinkStubDirective } from '../../test-utils';

describe('Landing-page Component', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LevelService,
                { provide: AngularFireDatabase, useValue: {} },
                { provide: AngularFireAuth, useValue: {} },
            ],
        }).compileComponents();
    });

    it('gets the correct prev and next sublevel', () => {
        let levelService: LevelService = TestBed.get(LevelService);

        expect(levelService.prevSublevelInd(levelsBasic(), { levelIndex: 0, sublevelIndex: 0 }))
            .toEqual(undefined);

        expect(levelService.prevSublevelInd(levelsBasic(), { levelIndex: 0, sublevelIndex: 1 }))
            .toEqual({ levelIndex: 0, sublevelIndex: 0 });

        expect(levelService.prevSublevelInd(levelsBasic(), { levelIndex: 1, sublevelIndex: 1 }))
            .toEqual({ levelIndex: 1, sublevelIndex: 0 });

        expect(levelService.nextSublevelInd(levelsBasic(), { levelIndex: 0, sublevelIndex: 0 }))
            .toEqual({ levelIndex: 1, sublevelIndex: 0 });

        expect(levelService.nextSublevelInd(levelsBasic(), { levelIndex: 1, sublevelIndex: 0 }))
            .toEqual({ levelIndex: 1, sublevelIndex: 1 });

        expect(levelService.nextSublevelInd(levelsBasic(), { levelIndex: 1, sublevelIndex: 1 }))
            .toEqual(undefined);
    });
});

