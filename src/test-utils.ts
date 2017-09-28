import { TestBed } from '@angular/core/testing';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";
import { Input, Directive } from '@angular/core';

// First, initialize the Angular testing environment.
TestBed.initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);

@Directive({
	selector: '[routerLink]',
	host: {
		'(click)': 'onClick()'
	}
})
export class RouterLinkStubDirective {
	@Input('routerLink') linkParams: any;
	navigatedTo: any = null;

	onClick() {
		this.navigatedTo = this.linkParams;
	}
}