import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Question} from '../shared/models/question.model';
import {QuestionService} from '../shared/services/question.service';
import {ChoiceService} from '../shared/services/choice.service';
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
    selectedIndex = -1;
    editing: object = {};
    timer = null;
    messages: object = {};
    isLoading = false;
    optionsChoiceVisible = true;

    constructor(
        private questionService: QuestionService,
        private choiceService: ChoiceService,
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

    getQuestionTreeviewTitle(data, index, element) {
        const question = Question.fromJSON(data);
        element.innerHTML = question.getLocalization(environment.locale.use);
        if (element.innerHTML === '') {
            element.innerHTML = 'Pas de titre';
        }
    }

    getLocalizedTitle(data) {
        const question = Question.fromJSON(data);
        return question.getLocalization(environment.locale.use);
    }

    onAddQuestion() {
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

    createNewQuestion() {
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
        if (this.selectedIndex + 1 > -1) {
            /*this.questionService.move(this.questions[this.selectedIndex].id, -1).subscribe(() => {
                this.loadQuestion();
            });*/
            console.log('Questions Before ranking up : ' + JSON.stringify(this.questions));

            this.questions[(this.selectedIndex - 1)].sequence = this.selectedIndex;
            this.questions[this.selectedIndex].sequence = this.selectedIndex - 1;

            console.log('Questions after ranking up : ' + JSON.stringify(this.questions));
        }
    }
    QuestionTypeChanged(data) {
        if (data.value === 1) {
            this.optionsChoiceVisible = false;
        } else {
            this.optionsChoiceVisible = true;
        }
    }

    onMoveDown() {
        if ((this.selectedIndex > -1) && (this.selectedIndex + 1 < this.questions.length)) {
            console.log('Questions Before ranking down : ' + JSON.stringify(this.questions));

            this.questions[(this.selectedIndex + 1)].sequence = this.selectedIndex;
            this.questions[this.selectedIndex].sequence = this.selectedIndex - 1;

            console.log('Questions after ranking down : ' + JSON.stringify(this.questions));
           /* this.questionService.move(this.questions[this.selectedIndex].id, 1).subscribe(() => {
                this.loadQuestion();
            });*/
        }
    }

    onQuestionSelected(e) {
        if (this.selectedIndex !== e.itemIndex) {
            this.isLoading = true;
            this.selectedIndex = e.itemIndex;

            this.setNextQuestion();
            this.loadSource(this.questions[this.selectedIndex].id);

            this.isLoading = false;
        }
    }

    onFormUpdated(item, e) {
        if (!this.isLoading) {
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

    addNewQuestionChoice(e) {
        this.choiceService.save(e.data).subscribe(info => {
            this.loadSource(this.questions[this.selectedIndex].id);
        }, error => {
            this.loadSource(this.questions[this.selectedIndex].id);
        });
    }

    setNextQuestion() {
        this.nextQuestions = [];

        this.questions.forEach((next_question) => {
            if (next_question.id !== this.questions[this.selectedIndex].id) {
                this.nextQuestions.push(next_question);
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
