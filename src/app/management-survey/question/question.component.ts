import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Question} from '../shared/models/question.model';
import {QuestionService} from '../shared/services/question.service';
import {ChoiceService} from '../shared/services/choice.service';
import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {confirm} from 'devextreme/ui/dialog';
import {MatSnackBar} from '@angular/material';
import {DxTreeViewComponent} from 'devextreme-angular';

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
    @ViewChild(DxTreeViewComponent) treeViewQuestion: DxTreeViewComponent;

    questions: Question[] = [];
    nextQuestions: Question[] = [];
    selectedIndex = -1;
    editing: object = {};
    timer = null;
    messages: object = {};
    isLoading = false;
    optionsChoiceVisible = true;
    questionTypeOptions = {dataSource: [], displayExpr: 'text', valueExpr: 'value', onValueChanged: this.QuestionTypeChanged.bind(this)};
    questionTypeChoiceCanceled = false;

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
        this.translate.get(['removeQuestion', 'question', 'newTitle', 'newQuestion', 'choiceAnswer', 'textAnswer', 'dateAnswer', 'removeQuestionChoices'])
            .subscribe(labels => {
                this.messages = labels;
                this.questionTypeOptions.dataSource = [
                    {value: 1, text: labels['choiceAnswer']},
                    {value: 2, text: labels['textAnswer']},
                    {value: 3, text: labels['dateAnswer']},
                ];
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
        this.isLoading = true ;
        const question = this.createNewQuestion();

        this.questionService.save(question)
            .subscribe(info => {
                    question.id = info['id'];
                    this.selectedIndex = this.questions.length - 1;
                    this.loadQuestion();
                    this.dataSource = [];
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
        question.questionType = 2;
        this.displayOptionDetails(question.questionType);
        question.sequence = this.getLastQuestionSequence();
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

        this.questions.push(question);
        return question;
    }

    onMoveUp() {
        if (this.selectedIndex - 1 > -1) {
            const sequence1 = this.questions[this.selectedIndex].sequence;
            const sequence2 = this.questions[this.selectedIndex - 1].sequence;

            this.questions[this.selectedIndex].sequence = sequence2;
            this.questions[this.selectedIndex - 1].sequence = sequence1;

            this.questions.sort(function(a, b) {return (a.sequence > b.sequence) ? 1 : ((b.sequence > a.sequence) ? -1 : 0); } );

            this.selectedIndex -- ;

            this.moveQuestion();
        }
    }

    onMoveDown() {
        if ((this.selectedIndex > -1) && (this.selectedIndex + 1 < this.questions.length)) {

            const sequence1 = this.questions[this.selectedIndex].sequence;
            const sequence2 = this.questions[this.selectedIndex + 1].sequence;

            this.questions[this.selectedIndex].sequence = sequence2;
            this.questions[(this.selectedIndex + 1)].sequence = sequence1;

            this.questions.sort(function(a, b) {return (a.sequence > b.sequence) ? 1 : ((b.sequence > a.sequence) ? -1 : 0); } );

            this.selectedIndex ++ ;

            this.moveQuestion();
        }
    }

    QuestionTypeChanged(data) {
        if (this.questionTypeChoiceCanceled) {
            this.questionTypeChoiceCanceled = false;
            return;
        }

        let questionType = data.value;
        if ((data.previousValue === 1) && (!this.isLoading) && (this.dataSource.length > 0)) {
            confirm(this.messages['removeQuestionChoices'], this.messages['question']).then((result) => {
                if (!result) {
                    this.questionTypeChoiceCanceled = true;
                    data.component.option('value', data.previousValue);
                    questionType = data.previousValue;
                } else {
                    this.choiceService.deleteQuestionsChoices(this.questions[this.selectedIndex].id)
                        .subscribe(deleteResult => {
                            if (deleteResult) {
                                console.log('Les choix de réponses pour cette question ont été supprimés');
                            } else {
                                console.log('Erreur lors de la suppression des choix de la question');
                            }
                        });
                }
            });
        }
        this.displayOptionDetails(questionType);
        this.isLoading = false;
    }

    onQuestionSelected(e) {
        this.isLoading = true;
        if (this.selectedIndex !== e.itemIndex) {

            this.selectedIndex = e.itemIndex;

            this.setNextQuestion();

            this.displayOptionDetails(this.questions[this.selectedIndex].questionType);

            this.loadSource(this.questions[this.selectedIndex].id);
        }
    }

    onFormUpdated(item, e) {
        if (item !== 'form') {
            this.questions[this.selectedIndex][item] = e.value;
        }
        this.saveQuestion();
    }

    saveQuestion() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.questionService.save(this.questions[this.selectedIndex]).subscribe();
        }, 1000);
    }

    moveQuestion() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.questionService.move(this.questions[this.selectedIndex].id, this.questions[this.selectedIndex].sequence).subscribe();
        }, 1000);
    }

    onRemoveQuestion() {
        if (this.selectedIndex > -1) {
            confirm(this.messages['removeQuestion'], this.messages['question']).then((result) => {
                if (result) {
                    this.questionService.remove(this.questions[this.selectedIndex].id)
                        .subscribe(removeResult => {
                            this.selectedIndex = 0;
                            this.loadQuestion();
                        });
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

        this.treeViewQuestion.instance.option('dataSource', this.questions);
    }

    displayOptionDetails(questionType) {
        if (questionType === 1) {
            this.optionsChoiceVisible = true;
        } else {
            this.optionsChoiceVisible = false;
        }
    }

    getLastQuestionSequence() {
        return this.questions[this.questions.length - 1].sequence + 1;
    }
}
