import '../../test-utils';
import { TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form';
import { AngularFireAuth } from 'angularfire2/auth';

// partof: #TST-login
describe('Login form', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginFormComponent],
            providers: [{ provide: AngularFireAuth, useValue: {} }],
        }).compileComponents();
    });

    it('works', () => {
        let form = TestBed.createComponent(LoginFormComponent);
        expect(form).toBeTruthy();
    });
});
