import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLaneComponent } from './course-lane.component';

describe('CourseLaneComponent', () => {
  let component: CourseLaneComponent;
  let fixture: ComponentFixture<CourseLaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLaneComponent ]
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
