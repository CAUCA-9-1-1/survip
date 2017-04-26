import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionSurveyComponent } from './intervention-survey.component';

describe('InterventionSurveyComponent', () => {
  let component: InterventionSurveyComponent;
  let fixture: ComponentFixture<InterventionSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionSurveyComponent ]
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
