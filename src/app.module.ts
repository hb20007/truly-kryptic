import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './components/app/app';
import { NavbarComponent } from "./components/nav-bar/nav-bar";
import { LandingpageComponent } from "./components/landing/landing";
import { firebaseConfig } from './firebase.config';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form';
import { ProviderAuthComponent } from './components/provider-auth/provider-auth';
import { LoginComponent } from './components/login/login';

const appRoutes: Routes = [
    { path: '', component: LandingpageComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
        appRoutes,
        { useHash: true }
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
    LoginComponent,
    ProviderAuthComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
