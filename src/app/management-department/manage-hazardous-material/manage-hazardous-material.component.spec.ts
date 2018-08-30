import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {ManageHazardousMaterialComponent} from './manage-hazardous-material.component';


describe('ManageHazardousMaterialComponent', () => {
    let component: ManageHazardousMaterialComponent;
    let fixture: ComponentFixture<ManageHazardousMaterialComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [ManageHazardousMaterialComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageHazardousMaterialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
