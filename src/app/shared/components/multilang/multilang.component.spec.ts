import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {MultilangComponent} from './multilang.component';


describe('MultilangComponent', () => {
    let component: MultilangComponent;
    let fixture: ComponentFixture<MultilangComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultilangComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
