import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app';
import { NavbarComponent } from "./components/nav-bar/nav-bar";
import { LandingpageComponent } from "./components/landing-page/landing";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingpageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
