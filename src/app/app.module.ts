import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from "./components/nav-bar/nav-bar.component";
import { LandingpageComponent } from "./pages/landing-page/landing-page.component";

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
