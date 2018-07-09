import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../test.module.spec';
import {InspectionDashboardComponent} from './inspection-dashboard.component';


describe('InspectionDashboardComponent', () => {
    let component: InspectionDashboardComponent;
    let fixture: ComponentFixture<InspectionDashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [InspectionDashboardComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InspectionDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
