import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../test.module';
import { PreventionSurveyComponent } from './prevention-survey.component';
import { QuestionSliderComponent } from './question-slider/question-slider.component';
import { QuestionComponent } from './question/question.component';

describe('PreventionSurveyComponent', () => {
  let component: PreventionSurveyComponent;
  let fixture: ComponentFixture<PreventionSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [
        PreventionSurveyComponent,
        QuestionSliderComponent,
        QuestionComponent
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
