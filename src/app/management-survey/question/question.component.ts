import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from 'igo2';
import {confirm} from 'devextreme/ui/dialog';

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
  selectedIndex: number = -1;
  columns: object[] = [];
  editing: object = {};
  switchQuestion = false;
  timer = null;
  messages: object = {};

  constructor(
    private questionService: QuestionService,
    private choiceService: ChoiceService,
    private translate: LanguageService
  ) {
    super();
  }

  ngOnInit() {
    this.loadQuestion();
    this.translate.translate.get(['removeQuestion', 'question', 'newTitle', 'newQuestion']).subscribe(labels => {
      this.messages = labels;
    });
  }

  public onAddQuestion() {
    this.switchQuestion = true;
    const question = new Question();
    question.idSurvey = this.survey;
    question.title = {
      'fr': this.messages['newTitle']
    };
    question.description = {
      'fr': this.messages['newQuestion']
    };

    this.questionService.create(question).subscribe(info => {
      if (info.success) {
        question.idSurveyQuestion = info.idSurveyQuestion;

        this.selectedIndex = 0;
        this.loadQuestion();
        this.setNextQuestion();
        this.loadChoice();
      }
    });
  }

  public onMoveUp() {
    if (this.selectedIndex > -1) {
      this.questionService.move(this.questions[this.selectedIndex].idSurveyQuestion, -1).subscribe(() => {
        this.loadQuestion();
      });
    }
  }

  public onMoveDown() {
    if (this.selectedIndex > -1) {
      this.questionService.move(this.questions[this.selectedIndex].idSurveyQuestion, 1).subscribe(() => {
        this.loadQuestion();
      });
    }
  }

  public onRowSelected(e) {
    this.switchQuestion = true;
    this.selectedIndex = e.itemIndex;

    this.setNextQuestion();
    this.loadChoice();
  }

  public onFormUpdated(item, e) {
    if (!this.switchQuestion) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (item !== 'form') {
        this.questions[this.selectedIndex][item] = e.value;
      }

      this.timer = setTimeout(() => {
        this.questionService.update(this.questions[this.selectedIndex]).subscribe();
      }, 1000);
    }
  }

  public onRemoveQuestion() {
    if (this.selectedIndex > -1) {
      confirm(this.messages['removeQuestion'], this.messages['question']).done((result) => {
        if (result) {
          this.questionService.remove(this.questions[this.selectedIndex].idSurveyQuestion).subscribe();
        }
      });
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

  public onChoiceUpdated(e) {
    e.data.idSurveyChoice = e.key.idSurveyChoice;

    this.choiceService.update(e.data).subscribe();
  }

  public onChoiceRemoved(e) {
    this.choiceService.remove(e.key.idSurveyChoice).subscribe();
  }

  private setNextQuestion() {
    this.nextQuestions = [];

    this.questions.forEach((question) => {
      if (question.idSurveyQuestion !== this.questions[this.selectedIndex].idSurveyQuestion) {
        this.nextQuestions.push(question);
      }
    });
  }

  private loadChoice() {
    this.choiceService.getAll(this.questions[this.selectedIndex].idSurveyQuestion).subscribe(infoChoice => {
      this.choices = infoChoice.data;
      this.switchQuestion = false;
    });
  }

  private loadQuestion() {
    this.questionService.getAll(this.survey).subscribe(infoQuestion => {
      this.questions = infoQuestion.data;

      this.questions.forEach((question, index) => {
        if (this.selectedIndex > -1 && question.idSurveyQuestion === this.questions[this.selectedIndex].idSurveyQuestion) {
          this.questions[index]['selected'] = true;
        }
      });
    });
  }
}
