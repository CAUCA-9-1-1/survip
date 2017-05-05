import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventionSurveyComponent } from './prevention-survey.component';

describe('PreventionSurveyComponent', () => {
  let component: PreventionSurveyComponent;
  let fixture: ComponentFixture<PreventionSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventionSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
