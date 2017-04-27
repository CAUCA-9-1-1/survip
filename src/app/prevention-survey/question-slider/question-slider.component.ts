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
  private questions: Question[];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.loadQuestion();
  }

  next() {
    if (this.selectedTab < this.questions.length - 1) {
      this.selectedTab++;
    }
  }

  previous() {
    if (this.selectedTab > 0) {
      this.selectedTab--;
    }
  }

  private loadQuestion() {
    this.questionService.getAll().subscribe(result => {
      this.questions = result.data;
    });
  }
}
