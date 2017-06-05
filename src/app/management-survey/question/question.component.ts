import {Component, Input, OnInit} from '@angular/core';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
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
export class QuestionComponent extends EditDatagrid implements OnInit {
  @Input() survey = '';

  questions: Question[] = [];
  choices: Choice[] = [];
  selectedQuestion: Question;
  columns: object[] = [];
  editing: object = {};
  switchQuestion = false;
  questionType = {
    dataSource: [
      {value: 'choice', text: 'choiceAnswer'},
      {value: 'text', text: 'textAnswer'},
      {value: 'date', text: 'dateAnswer'}
    ],
    displayExpr: 'text',
    valueExpr: 'value'
  };

  constructor(
    private questionService: QuestionService,
    private choiceService: ChoiceService
  ) {
    super();

    this.columns = [{
      dataField: 'sequence',
      width: '15%'
    }, {
      dataField: 'name',
      width: '20%',
      calculateCellValue: this.onCalculateCellValue.bind(this),
    }, {
      dataField: 'idSurveyQuestionNext',
      lookup: {
        dataSource: [],
        displayExpr: 'description.fr',
        valueExpr: 'idSurveyQuestion'
      }
    }, {
      dataField: 'isActive',
      width: '15%'
    }];

    this.editing = {
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true,
      form: {
        colCount: 1,
        items: [{
          dataField: 'sequence',
          isRequired: true
        }, {
          dataField: 'name.fr',
          isRequired: true
        }, {
          dataField: 'idSurveyQuestionNext',
        }, {
          dataField: 'isActive',
          editorType: 'dxCheckBox'
        }]
      }
    };
  }

  ngOnInit() {
    this.loadQuestion();
  }

  onRowSelected(e) {
    this.switchQuestion = true;
    this.selectedQuestion = e.itemData;
    this.columns[2]['lookup']['dataSource'] = [];

    this.questions.forEach((question) => {
      if (question.idSurveyQuestion !== this.selectedQuestion.idSurveyQuestion) {
        this.columns[2]['lookup']['dataSource'].push(question);
      }
    });

    this.loadChoice();
  }

  onFormUpdated(e) {
    if (!this.switchQuestion) {
      this.questionService.update(this.selectedQuestion).subscribe(infoQuestion => {
        console.log(infoQuestion);
      });
    }
  }

  onRowUpdated(e) {
    const  choice = e.key;

    for (const key in e.data) {
      if (e.data[key]) {
        choice[key] = e.data[key];
      }
    }

    this.choiceService.update(choice).subscribe(infoChoice => {
      console.log(infoChoice);
    });
  }

  private loadChoice() {
    this.choiceService.getAll(this.selectedQuestion.idSurveyQuestion).subscribe(infoChoice => {
      if (!infoChoice.success) {
        console.error(infoChoice.error);
      }

      this.choices = infoChoice.data;
      this.switchQuestion = false;
    });
  }

  private loadQuestion() {
    this.questionService.getAll(this.survey).subscribe(infoQuestion => {
      if (!infoQuestion.success) {
        console.error(infoQuestion.error);
      }

      this.questions = infoQuestion.data;
    });
  }
}
