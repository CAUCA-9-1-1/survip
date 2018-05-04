import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Question} from '../shared/models/question.model';
import {QuestionService} from '../shared/services/question.service';
import {ChoiceService} from '../shared/services/choice.service';
import {Choice} from '../shared/models/choice.model';
import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {confirm} from 'devextreme/ui/dialog';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-managementsurvey-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.styl'],
    providers: [
        QuestionService,
        ChoiceService
    ]
})
export class QuestionComponent extends GridWithCrudService implements OnInit {
    @Input() survey = '';

    questions: Question[] = [];
    nextQuestions: Question[] = [];
    choices: Choice[] = [];
    selectedIndex = -1;
    editing: object = {};
    switchQuestion = false;
    timer = null;
    messages: object = {};

    constructor(
        private questionService: QuestionService,
        choiceService: ChoiceService,
        private translate: TranslateService,
        private notification: MatSnackBar,
    ) {
        super(choiceService);
    }

    ngOnInit() {
        this.loadQuestion();
        this.translate.get(['removeQuestion', 'question', 'newTitle', 'newQuestion']).subscribe(labels => {
            this.messages = labels;
        });
    }

    getLocalizationsTitle(data, index, element) {
        if (data.localizations.length > 0) {
            const surveyQuestion = Question.fromJSON(data.localizations);
            if (!surveyQuestion.localizations) {
                surveyQuestion.localizations = data.localizations;
            }
            element.innerHTML = surveyQuestion.getLocalizationTitle(environment.locale.use);
        } else {
            element.innerHTML = 'Pas de titre';
        }
    }

    getChoiceTitle(data)  {
        const choice = Choice.fromJSON(data);
        return choice.getLocalizationTitle(environment.locale.use);
    }

    onAddQuestion() {
        this.switchQuestion = true;
        const question = this.createNewQuestion();

        this.questionService.save(question)
            .subscribe(info => {
                    question.id = info['id'];
                    this.selectedIndex = 0;
                    this.loadQuestion();
                    this.setNextQuestion();
                    this.loadSource(question.id);
                },
                error => {
                    this.notification.open('Erreur lors de l"ajout de question.', '', {
                        duration: 3000,
                    });
                });
    }

    private createNewQuestion() {
        const question = new Question();
        question.idSurvey = this.survey;
        question.questionType = 1;
        question.localizations = [];
        environment.locale.available.forEach(language => {
            const languageItem = {
                languageCode: language.toLowerCase(),
                isActive: true,
                name: '',
                title: ''
            };
            question.localizations.push(languageItem);
        });
        return question;
    }

    onMoveUp() {
        if (this.selectedIndex > -1) {
            this.questionService.move(this.questions[this.selectedIndex].id, -1).subscribe(() => {
                this.loadQuestion();
            });
        }
    }

    onMoveDown() {
        if (this.selectedIndex > -1) {
            this.questionService.move(this.questions[this.selectedIndex].id, 1).subscribe(() => {
                this.loadQuestion();
            });
        }
    }

    onRowSelected(e) {
        this.switchQuestion = true;
        this.selectedIndex = e.itemIndex;

        this.setNextQuestion();
        this.loadSource(this.questions[this.selectedIndex].id);
    }

    onFormUpdated(item, e) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (item !== 'form') {
            this.questions[this.selectedIndex][item] = e.value;
        }

        this.timer = setTimeout(() => {
            this.questionService.save(this.questions[this.selectedIndex]).subscribe();
        }, 1000);
    }

    onRemoveQuestion() {
        if (this.selectedIndex > -1) {
            confirm(this.messages['removeQuestion'], this.messages['question']).then((result) => {
                if (result) {
                    this.questionService.remove(this.questions[this.selectedIndex].id).subscribe();
                }
            });
        }
    }

    onInitNewChoice(e) {
        e.data.isActive = true;
        e.data.idSurveyQuestion = this.questions[this.selectedIndex].id;
    }

    setNextQuestion() {
        this.nextQuestions = [];

        this.questions.forEach((question) => {
            if (question.id !== this.questions[this.selectedIndex].id) {
                this.nextQuestions.push(question);
            }
        });
    }

    loadQuestion() {
        this.questionService.getAll(this.survey).subscribe(data => {
            this.questions = data;
            this.filteredActiveQuestion();
            this.questions.forEach((question, index) => {
                if (this.selectedIndex > -1 && question.id === this.questions[this.selectedIndex].id) {
                    this.questions[index]['selected'] = true;
                }
            });
        });
    }

    filteredActiveQuestion() {
        this.questions = this.questions.filter((item) => {
            return (item.isActive);
        });
    }

    onMultiLangValueChanged(item, e) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.onFormUpdated(item, e);
        }, 1500);

    }
}
