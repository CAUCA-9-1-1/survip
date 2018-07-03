import {NgModule} from '@angular/core';
import {Router} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import { SharedModule } from './shared/shared.module';

class MockRouter {
    navigate = jasmine.createSpy('navigate');
}

const mockRouter = new MockRouter();


@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [
        SharedModule,
    ],
    providers: [{
        provide: APP_BASE_HREF,
        useValue: '/',
    }, {
        provide: Router,
        useValue: mockRouter,
    }],
})
export class TestModule { }
