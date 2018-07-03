import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TestModule} from '../../../test.module.spec';
import {PageNotFoundComponent} from './page-not-found.component';


describe('PageNotFoundComponent', () => {
    let component: PageNotFoundComponent;
    let fixture: ComponentFixture<PageNotFoundComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule,
                RouterTestingModule,
            ],
            declarations: []
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageNotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
