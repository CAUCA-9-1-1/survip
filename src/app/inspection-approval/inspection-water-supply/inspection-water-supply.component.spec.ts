import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {InspectionWaterSupplyComponent} from './inspection-water-supply.component';


describe('InspectionWaterSupplyComponent', () => {
    let component: InspectionWaterSupplyComponent;
    let fixture: ComponentFixture<InspectionWaterSupplyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [InspectionWaterSupplyComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InspectionWaterSupplyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
