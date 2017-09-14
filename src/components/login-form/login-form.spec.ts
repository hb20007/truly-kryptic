import '../../test-utils';
import { TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProviderAuthComponent } from '../provider-auth/provider-auth';
import { NgForm, NgModel } from '@angular/forms';

// partof: #TST-login
describe('Login form', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProviderAuthComponent, LoginFormComponent, NgForm, NgModel],
            providers: [{ provide: AngularFireAuth, useValue: {} }],
        }).compileComponents();
    });

    it('works', () => {
        let form = TestBed.createComponent(LoginFormComponent);
        expect(form).toBeTruthy();
    });
});
