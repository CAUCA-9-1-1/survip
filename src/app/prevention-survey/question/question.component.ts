import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-prevention-survey-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.styl']
})
export class QuestionComponent implements OnInit {
  @Input() question: object;
  @Output() change: EventEmitter<boolean|string> = new EventEmitter<boolean|string>();

  constructor() { }

  ngOnInit() {
  }

  boolChange(e) {
    this.change.emit(e.checked);
  }

  choiceChange(e) {
    this.change.emit(e);
  }

  dateChange(e) {
    this.change.emit(e.target.value);
  }

  textChange(e) {
    this.change.emit(e.target.value);
  }
}
