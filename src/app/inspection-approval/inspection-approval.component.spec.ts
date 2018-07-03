import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {TestModule} from '../test.module.spec';
import {InspectionApprovalComponent} from './inspection-approval.component';
import {BuildingDetailsComponent} from './building-details/building-details.component';
import {InspectionImplantationPlanComponent} from './inspection-implantation-plan/inspection-implantation-plan.component';
import {BuildingHazardousMaterialsComponent} from './building-hazardous-materials/building-hazardous-materials.component';
import {InspectionWaterSupplyComponent} from './inspection-water-supply/inspection-water-supply.component';
import {BuildingContactsComponent} from './building-contacts/building-contacts.component';
import {BuildingParticularRisksComponent} from './building-particular-risks/building-particular-risks.component';
import {InspectionGeneralInfoComponent} from './inspection-general-info/inspection-general-info.component';
import {BuildingAnomaliesComponent} from './building-anomalies/building-anomalies.component';
import {BuildingFireProtectionComponent} from './building-fire-protection/building-fire-protection.component';
import {BuildingListComponent} from './building-list/building-list.component';
import {InspectionSurveyComponent} from './inspection-survey/inspection-survey.component';
import {BuildingPnapsComponent} from './building-pnaps/building-pnaps.component';
import {SectionListComponent} from './section-list/section-list.component';
import {InspectionCourseComponent} from './inspection-course/inspection-course.component';


describe('InspectionApprovalComponent', () => {
    let component: InspectionApprovalComponent;
    let fixture: ComponentFixture<InspectionApprovalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                InspectionApprovalComponent,
                SectionListComponent,
                BuildingDetailsComponent,
                InspectionSurveyComponent,
                BuildingContactsComponent,
                BuildingPnapsComponent,
                BuildingHazardousMaterialsComponent,
                BuildingFireProtectionComponent,
                InspectionWaterSupplyComponent,
                BuildingParticularRisksComponent,
                BuildingAnomaliesComponent,
                InspectionGeneralInfoComponent,
                InspectionImplantationPlanComponent,
                InspectionCourseComponent,
                BuildingListComponent,
            ],
            providers: [{
                provide: ActivatedRoute,
                useValue: {
                    params: Observable.of({})
                }
            }]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InspectionApprovalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
