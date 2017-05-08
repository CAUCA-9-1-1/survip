import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { QuestionSliderComponent } from './question-slider.component';
import { QuestionComponent } from '../question/question.component';
import { SurveyQuestionService } from '../shared/services/survey-question.service';

describe('QuestionSliderComponent', () => {
  let component: QuestionSliderComponent;
  let fixture: ComponentFixture<QuestionSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [
        QuestionComponent,
        QuestionSliderComponent
      ],
      providers: [ SurveyQuestionService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
