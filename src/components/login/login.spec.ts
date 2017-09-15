import '../../test-utils';
import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProviderAuthComponent } from '../provider-auth/provider-auth';
import { NgForm, NgModel } from '@angular/forms';

// partof: #TST-login
describe('Login form', () => {

    beforeEach(() => {
        // TestBed.configureTestingModule({
        //     declarations: [ProviderAuthComponent, LoginComponent, NgForm, NgModel],
        //     providers: [{ provide: AngularFireAuth, useValue: {} }],
        // }).compileComponents();
    });

    it('works', () => {
        // let form = TestBed.createComponent(LoginComponent);
        // expect(form).toBeTruthy();
    });
});
