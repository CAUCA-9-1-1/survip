import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module';
import {CourseComponent} from './course.component';
import {CourseLaneComponent} from '../course-lane/course-lane.component';
import {LaneService} from '../shared/services/lane.service';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [
        CourseComponent,
        CourseLaneComponent
      ],
      providers: [
        LaneService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
