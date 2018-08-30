import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {HazardousMaterialComponent} from './hazardous-material.component';


describe('HazardousMaterialComponent', () => {
    let component: HazardousMaterialComponent;
    let fixture: ComponentFixture<HazardousMaterialComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [HazardousMaterialComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HazardousMaterialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
