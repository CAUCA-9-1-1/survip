import { Component, OnInit } from '@angular/core';

import { Question } from '../shared/models/question.model';
import { SurveyQuestionService } from '../shared/services/survey-question.service';

@Component({
  selector: 'app-prevention-survey-question-slider',
  templateUrl: './question-slider.component.html',
  styleUrls: ['./question-slider.component.styl']
})
export class QuestionSliderComponent implements OnInit {
  private tabs = [];
  private tabSelected = 0;
  private questions: Question[];
  private questionIndex = 0;
  private onLastQuestion = false;
  private lastAnswer: any = null;

  constructor(private surveyQuestionService: SurveyQuestionService) { }

  ngOnInit() {
    this.loadQuestion();
  }

  onAnswerChange(value: boolean|string) {
    this.lastAnswer = value;
  }

  complete() {
    alert('OK, What we do!');
  }

  next() {
    if (this.tabSelected < this.questions.length - 1) {
      const question = this.questions[this.tabSelected];
      let next = this.questions[(this.questionIndex + 1)].idSurveyQuestion;

      if (question.idSurveyQuestionNextOnFalse && question.questionType === 'boolean' && !this.lastAnswer) {
        next = question.idSurveyQuestionNextOnFalse;
      } else if (question.idSurveyQuestionNext) {
        next = question.idSurveyQuestionNext;
      }

      this.questionIndex = this.findQuestion(next);
      this.lastAnswer = null;
      this.onLastQuestion = (this.questionIndex === this.questions.length - 1);
      this.tabSelected++;
      this.tabs.push(this.questions[this.questionIndex]);
    }
  }

  private findQuestion(uuid: string) {
    for (let i = 0, j = this.questions.length; i < j; i++) {
      if (this.questions[i].idSurveyQuestion === uuid) {
        return i;
      }
    }

    return this.questionIndex + 1;
  }

  private loadQuestion() {
    this.surveyQuestionService.getAll('43deacf8-fef0-4b88-a0fd-29cb1bfa0e04').subscribe(result => {
      this.questions = result.data;
      this.tabs = [this.questions[0]];
    });
  }
}
