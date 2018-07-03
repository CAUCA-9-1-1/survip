import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {FireSafetyDepartmentComponent} from './firesafetydepartment.component';


describe('FireSafetyDepartmentComponent', () => {
    let component: FireSafetyDepartmentComponent;
    let fixture: ComponentFixture<FireSafetyDepartmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [FireSafetyDepartmentComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FireSafetyDepartmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
