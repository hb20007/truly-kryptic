import '../../test-utils';
import { TestBed } from '@angular/core/testing';
import { LevelService } from './level.service';
import { levelsBasic, levelGuessesDatabaseMock, levelGuesses } from './level.mocks';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

describe('Landing-page Component', () => {

    let levelService: LevelService;
    let db = { object: jasmine.createSpy('object') };

    let indices = Observable.of({ levelIndex: 1, sublevelIndex: 0 });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LevelService,
                { provide: AngularFireDatabase, useValue: db },
                { provide: AngularFireAuth, useValue: {} },
            ],
        }).compileComponents();

        levelService = TestBed.get(LevelService);

        spyOnProperty(levelService, 'userId', 'get')
            .and.returnValue('user1234');
    });

    it('gets the correct prev and next sublevel', () => {

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

    it('retrieves guesses', () => {
        db.object.and.returnValue(Observable.of(levelGuessesDatabaseMock()));

        levelService.levelGuesses(indices).subscribe(guesses => expect(guesses).toEqual(levelGuesses()));
    });

    it('retrieves both default and unlocked hints', () => {
        spyOn(levelService, 'levelGuesses').and.returnValue(Observable.of(levelGuesses()));

        levelService.levelHints(levelsBasic(), indices).subscribe(hints => {
            expect(hints).toEqual([
                { image: 'anagram.png' },
                { text: 'low end keg' },
                { text: 'nice try', triggers: ['entry', 'entryy'] },
            ]);
        });
    });

    it('can get the answer for a given level', () => {
        db.object.and.returnValue(Observable.of({ $value: 'asdf' }));

        let indices = Observable.of({ levelIndex: 0, sublevelIndex: 0 });

        levelService.levelAnswer(indices).subscribe(answer => {
            expect(answer).toBe('asdf');
        });
    });
});

