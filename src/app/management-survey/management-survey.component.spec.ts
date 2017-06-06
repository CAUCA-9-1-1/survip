import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../test.module';
import {ManagementSurveyComponent} from './management-survey.component';
import {ListComponent} from './list/list.component';
import {QuestionComponent} from './question/question.component';

describe('ManagementSurveyComponent', () => {
  let component: ManagementSurveyComponent;
  let fixture: ComponentFixture<ManagementSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [
        ManagementSurveyComponent,
        ListComponent,
        QuestionComponent
      ]
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
