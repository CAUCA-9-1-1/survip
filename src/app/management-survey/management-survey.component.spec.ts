import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSurveyComponent } from './management-survey.component';

describe('ManagementSurveyComponent', () => {
  let component: ManagementSurveyComponent;
  let fixture: ComponentFixture<ManagementSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
