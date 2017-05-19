import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module';
import {BuildingComponent} from './building.component';
import {BuildingDetailComponent} from '../building-detail/building-detail.component';
import {CourseComponent} from '../course/course.component';
import {CourseLaneComponent} from '../course-lane/course-lane.component';
import {InterventionPlanService} from '../shared/services/intervention-plan.service';
import {LaneService} from '../shared/services/lane.service';
import {RiskLevelService} from '../../shared/services/risk-level.service';
import {InterventionPlanCourseService} from '../shared/services/intervention-plan-course.service';

describe('BuildingComponent', () => {
  let component: BuildingComponent;
  let fixture: ComponentFixture<BuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [
        BuildingDetailComponent,
        BuildingComponent,
        CourseComponent,
        CourseLaneComponent
      ],
      providers: [
        InterventionPlanService,
        InterventionPlanCourseService,
        LaneService,
        RiskLevelService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
