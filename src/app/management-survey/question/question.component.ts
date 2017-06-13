import {Component, Input, OnInit} from '@angular/core';

import {DataGrid} from '../../core/devextreme/datagrid';
import {Question} from '../shared/models/question.model';
import {QuestionService} from '../shared/services/question.service';
import {ChoiceService} from '../shared/services/choice.service';
import {Choice} from '../shared/models/choice.model';

@Component({
  selector: 'app-management-survey-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.styl'],
  providers: [
    QuestionService,
    ChoiceService
  ]
})
export class QuestionComponent extends DataGrid implements OnInit {
  @Input() survey = '';

  questions: Question[] = [];
  nextQuestions: Question[] = [];
  choices: Choice[] = [];
  selectedQuestion: Question;
  columns: object[] = [];
  editing: object = {};
  switchQuestion = false;
  questionType = [

  ];

  constructor(
    private questionService: QuestionService,
    private choiceService: ChoiceService
  ) {
    super();
  }

  ngOnInit() {
    this.loadQuestion();
  }

  onRowSelected(e) {
    this.switchQuestion = true;
    this.selectedQuestion = e.itemData;
    this.nextQuestions = [];

    this.questions.forEach((question) => {
      if (question.idSurveyQuestion !== this.selectedQuestion.idSurveyQuestion) {
        this.nextQuestions.push(question);
      }
    });

    this.loadChoice();
  }

  onFormUpdated(e) {
    if (!this.switchQuestion) {
      this.questionService.update(this.selectedQuestion).subscribe();
    }
  }

  public onInitNewChoice(e) {
    e.data.isActive = true;
  }

  public onChoiceInserted(e) {
    this.choiceService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadChoice();
      }
    });
  }

  onChoiceUpdated(e) {
    e.data.idSurveyChoice = e.key.idSurveyChoice;

    this.choiceService.update(e.data).subscribe();
  }

  onChoiceRemoved(e) {
    this.choiceService.remove(e.key.idSurveyChoice).subscribe();
  }

  private loadChoice() {
    this.choiceService.getAll(this.selectedQuestion.idSurveyQuestion).subscribe(infoChoice => {
      this.choices = infoChoice.data;
      this.switchQuestion = false;
    });
  }

  private loadQuestion() {
    this.questionService.getAll(this.survey).subscribe(infoQuestion => {
      this.questions = infoQuestion.data;
    });
  }
}
