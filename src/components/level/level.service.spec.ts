import '../../test-utils';
import { TestBed } from '@angular/core/testing';
import { LevelService } from './level.service';
import { levelsBasic, levelGuessesDatabaseMock, levelGuesses } from './level.mocks';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


describe('Landing-page Component', () => {

    let levelService: LevelService;
    let db = { object: jasmine.createSpy('object'), list: jasmine.createSpy('list') };

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
        db.list.and.returnValue(Observable.of(levelGuessesDatabaseMock()));

        levelService.levelGuesses(indices).subscribe(guesses => expect(guesses).toEqual(levelGuesses()));
    });

    it('retrieves both default and unlocked hints', () => {
        db.list.and.returnValue(Observable.of(levelsBasic()));

        spyOn(levelService, 'levelGuesses').and.returnValue(Observable.of(levelGuesses()));

        levelService.levelHints(indices).subscribe(hints => {
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

    it('correctly formats level summaries', () => {
        db.list.and.returnValue(Observable.of(levelsBasic()));

        levelService.levelSummaries().subscribe(summaries => {
            expect(summaries[0]).toEqual({
                levelNumber: '1',
                title: "Change numbers to...",
                solvedTotal: 0,
                solvedCurrentUser: false,
                levelIndex: 0,
                sublevelIndex: 0,
            });

            expect(summaries.length).toBe(3);
        });
    });

    it('correctly formats level info', () => {
        db.list.and.returnValue(Observable.of(levelsBasic()));

        levelService.basicLevelInfo(indices).subscribe(info => {
            expect(info).toEqual({
                levelNumber: '2a',
                title: "Anna Graham",
            });
        });
    });
});
