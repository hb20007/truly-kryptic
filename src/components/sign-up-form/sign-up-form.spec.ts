import '../../test-utils';
import { TestBed } from '@angular/core/testing';
import { SignUpFormComponent } from './sign-up-form';
import { AngularFireAuth } from 'angularfire2/auth';

// partof: #TST-landing-sign_up
describe('Sign up form', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SignUpFormComponent],
            providers: [{ provide: AngularFireAuth, useValue: {} }],
        }).compileComponents();
    });

    it('works', () => {
        let form = TestBed.createComponent(SignUpFormComponent);
        expect(form).toBeTruthy();
    });
});