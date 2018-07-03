import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {InspectionSurveyComponent} from './inspection-survey.component';


describe('InspectionSurveyComponent', () => {
    let component: InspectionSurveyComponent;
    let fixture: ComponentFixture<InspectionSurveyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [InspectionSurveyComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InspectionSurveyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
