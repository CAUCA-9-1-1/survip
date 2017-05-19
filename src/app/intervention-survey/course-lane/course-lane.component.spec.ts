import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module';
import {CourseLaneComponent} from './course-lane.component';
import {LaneService} from '../shared/services/lane.service';
import {InterventionPlanCourseLaneService} from '../shared/services/intervention-plan-course-lane.service';

describe('CourseLaneComponent', () => {
  let component: CourseLaneComponent;
  let fixture: ComponentFixture<CourseLaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [CourseLaneComponent],
      providers: [
        LaneService,
        InterventionPlanCourseLaneService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
