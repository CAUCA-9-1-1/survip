import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TestModule} from '../test.module';
import {InterventionBuildingComponent} from './intervention-building.component';
import {BuildingDetailComponent} from './building-detail/building-detail.component';
import {BuildingHazardousMaterialService} from '../intervention-survey/shared/services/building-hazardous-material.service';
import {BuildingContactService} from '../intervention-survey/shared/services/building-contact.service';
import {BuildingPersonRequiringAssistanceService} from '../intervention-survey/shared/services/building-person-requiring-assistance.service';
import {InterventionPlanBuildingService} from './shared/services/intervention-plan-building.service';

describe('InterventionBuildingComponent', () => {
  let component: InterventionBuildingComponent;
  let fixture: ComponentFixture<InterventionBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, RouterTestingModule],
      declarations: [
        InterventionBuildingComponent,
        BuildingDetailComponent
      ],
      providers: [
        BuildingContactService,
        BuildingHazardousMaterialService,
        BuildingPersonRequiringAssistanceService,
        InterventionPlanBuildingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
