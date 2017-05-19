import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TestModule} from '../test.module';
import {PreventionSurveyComponent} from './prevention-survey.component';
import {QuestionSliderComponent} from './question-slider/question-slider.component';
import {QuestionComponent} from './question/question.component';
import {SurveyQuestionService} from './shared/services/survey-question.service';
import {InspectionService} from '../shared/services/inspection.service';

describe('PreventionSurveyComponent', () => {
  let component: PreventionSurveyComponent;
  let fixture: ComponentFixture<PreventionSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        RouterTestingModule
      ],
      declarations: [
        PreventionSurveyComponent,
        QuestionSliderComponent,
        QuestionComponent
      ],
      providers: [
        SurveyQuestionService,
        InspectionService
      ]
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
