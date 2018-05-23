import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionCourseComponent } from './inspection-course.component';

describe('InspectionCourseComponent', () => {
  let component: InspectionCourseComponent;
  let fixture: ComponentFixture<InspectionCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
