import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './components/app/app';
import { NavbarComponent } from "./components/nav-bar/nav";
import { LandingpageComponent } from "./components/landing-page/landing";
import { firebaseConfig } from './firebase.config';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form';
import { ProviderAuthComponent } from './components/provider-auth/provider-auth';
import { LoginFormComponent } from './components/login-form/login-form';

const appRoutes: Routes = [
    { path: '', component: LandingpageComponent },
    { path: 'login', component: LoginFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingpageComponent,
    SignUpFormComponent,
    LoginFormComponent,
    ProviderAuthComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
