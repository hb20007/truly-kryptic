import { Component } from '@angular/core';
import * as AppTpl from './app.component.html';

@Component({
  selector: 'app-root',
  template: <any> AppTpl,
})
export class AppComponent {
  title = 'app';
}

