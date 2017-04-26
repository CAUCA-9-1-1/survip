import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prevention-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.styl']
})
export class QuestionComponent implements OnInit {
  @Input() question: Object;

  constructor() { }

  ngOnInit() {
  }

}
