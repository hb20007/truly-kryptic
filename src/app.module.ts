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
import { AccountComponent } from "./components/account/account";
import { LevelListComponent } from './components/level-list/level-list';
import { LevelComponent } from './components/level/level';
import { HallOfFameComponent } from "./components/hof/hof";
import { GettingStartedComponent } from './components/getting-started/getting-started';

const appRoutes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'getting-started', component: GettingStartedComponent },
  { path: 'level-list', component: LevelListComponent },
  { path: 'level/:level_id/:sublevel_id', component: LevelComponent },
  { path: 'hof', component: HallOfFameComponent }
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
    AccountComponent,
    ProviderAuthComponent,
    LevelListComponent,
    LevelComponent,
    HallOfFameComponent,
    GettingStartedComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
