import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TestModule} from '../test.module';
import {InterventionSurveyComponent} from './intervention-survey.component';
import {BuildingComponent} from './building/building.component';
import {BuildingDetailComponent} from './building-detail/building-detail.component';
import {ContactComponent} from '../intervention-building/contact/contact.component';
import {DangerousMaterialComponent} from '../intervention-building/dangerous-material/dangerous-material.component';
import {FireHydrantComponent} from './fire-hydrant/fire-hydrant.component';
import {ImplantationPlanComponent} from './implantation-plan/implantation-plan.component';
import {ParticularRiskComponent} from './particular-risk/particular-risk.component';
import {PersonRequiringAssistanceComponent} from '../intervention-building/person-requiring-assistance/person-requiring-assistance.component';
import {BuildingContactService} from './shared/services/building-contact.service';
import {BuildingHazardousMaterialService} from './shared/services/building-hazardous-material.service';
import {InterventionPlanFireHydrantService} from './shared/services/intervention-plan-fire-hydrant.service';
import {CourseComponent} from './course/course.component';
import {CourseLaneComponent} from './course-lane/course-lane.component';
import {InterventionPlanService} from './shared/services/intervention-plan.service';

describe('InterventionSurveyComponent', () => {
  let component: InterventionSurveyComponent;
  let fixture: ComponentFixture<InterventionSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule, RouterTestingModule ],
      declarations: [
        BuildingDetailComponent,
        BuildingComponent,
        ImplantationPlanComponent,
        ContactComponent,
        PersonRequiringAssistanceComponent,
        DangerousMaterialComponent,
        FireHydrantComponent,
        ParticularRiskComponent,
        InterventionSurveyComponent,
        CourseComponent,
        CourseLaneComponent
      ],
      providers: [
        BuildingContactService,
        BuildingHazardousMaterialService,
        InterventionPlanFireHydrantService,
        InterventionPlanService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
