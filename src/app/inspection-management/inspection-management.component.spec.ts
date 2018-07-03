import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../test.module.spec';
import {InspectionManagementComponent} from './inspection-management.component';


describe('InspectionManagementComponent', () => {
    let component: InspectionManagementComponent;
    let fixture: ComponentFixture<InspectionManagementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [InspectionManagementComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InspectionManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
