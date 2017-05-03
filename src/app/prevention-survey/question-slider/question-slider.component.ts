import { Component, OnInit } from '@angular/core';

import { Question } from '../shared/models/question.model';
import { QuestionService } from '../shared/services/question.service';

@Component({
  selector: 'app-prevention-survey-question-slider',
  templateUrl: './question-slider.component.html',
  styleUrls: ['./question-slider.component.styl']
})
export class QuestionSliderComponent implements OnInit {
  private selectedTab = 0;
  private onLastQuestion = false;
  private questions: Question[];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.loadQuestion();
  }

  complete() {
    alert('OK, What we do!');
  }

  next() {
    if (this.selectedTab < this.questions.length - 1) {
      this.selectedTab++;
      this.onLastQuestion = (this.selectedTab === this.questions.length - 1);
    }
  }

  previous() {
    if (this.selectedTab > 0) {
      this.selectedTab--;
      this.onLastQuestion = (this.selectedTab === this.questions.length - 1);
    }
  }

  private loadQuestion() {
    this.questionService.get('43deacf8-fef0-4b88-a0fd-29cb1bfa0e04').subscribe(result => {
      this.questions = result.questions;
    });
  }
}
