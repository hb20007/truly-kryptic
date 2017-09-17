import '../../test-utils';
import { TestBed } from '@angular/core/testing';
import { LevelListComponent } from './level-list';
import { AngularFireAuth } from 'angularfire2/auth';

describe('Landing-page Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LevelListComponent],
        }).compileComponents();
    });

    it('works', () => {
        let comp = TestBed.createComponent(LevelListComponent).componentInstance;
        expect(comp).toBeDefined();
    });

    it('correctly formats levels numbers', () => {
        let comp = TestBed.createComponent(LevelListComponent).componentInstance;

        expect(comp.getLevelNumber(23, 0, 1)).toBe('24');
        expect(comp.getLevelNumber(23, 0, 2)).toBe('24a');
        expect(comp.getLevelNumber(23, 1, 2)).toBe('24b');
    });
});

