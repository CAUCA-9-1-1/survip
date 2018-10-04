import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material';
import {DxTreeViewComponent} from 'devextreme-angular';
import {confirm} from 'devextreme/ui/dialog';

import config from '../../../assets/config/config.json';
import packageInfo from '../../../assets/config/package.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Question} from '../shared/models/question.model';
import {QuestionService} from '../shared/services/question.service';
import {ChoiceService} from '../shared/services/choice.service';
import {Choice} from '../shared/models/choice.model';

@Component({
    selector: 'app-managementsurvey-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
    providers: [
        QuestionService,
        ChoiceService
    ]
})
export class QuestionComponent extends GridWithCrudService implements OnInit {
    @Input() survey = '';
    @ViewChild(DxTreeViewComponent) treeViewQuestion: DxTreeViewComponent;

    public questions: Question[] = [];
    public nextQuestions: Question[] = [];
    public selectedIndex = -1;
    public editing: object = {};
    public timer = null;
    public messages: object = {};
    public isLoading = false;
    public optionsChoiceVisible = true;
    public questionTypeOptions = {dataSource: [], displayExpr: 'text', valueExpr: 'value',
                                  onValueChanged: this.QuestionTypeChanged.bind(this)};
    public questionOccurrenceOptions = {displayExpr: 'text', valueExpr: 'value', maxValue: 4, MinValue: 0, defaultValue: 0};
    public questionTypeChoiceCanceled = false;

    constructor(
        private questionService: QuestionService,
        private choiceService: ChoiceService,
        private translate: TranslateService,
        private notification: MatSnackBar,
    ) {
        super(choiceService);
        this.occurrenceValidation = this.occurrenceValidation.bind(this);
    }

    public setModel(data: any) {
        return Choice.fromJSON(data);
    }

    public ngOnInit() {
        this.loadQuestion();
        this.translate.get(['removeQuestion', 'question', 'newTitle', 'newQuestion', 'choiceAnswer',
                                 'textAnswer', 'dateAnswer', 'removeQuestionChoices', 'groupedQuestion',
                                 'endGroupQuestion'])
            .subscribe(labels => {
                this.messages = labels;
                this.questionTypeOptions.dataSource = [
                    {value: 1, text: labels['choiceAnswer']},
                    {value: 2, text: labels['textAnswer']},
                    {value: 3, text: labels['dateAnswer']},
                    {value: 4, text: labels['groupedQuestion']}
                ];
            });
    }

    public getQuestionTreeviewTitle(data) {
        const question = Question.fromJSON(data);
        let title = question.getLocalization(config.locale);
        if (title === '') {
            title = 'Pas de titre';
        }
        return title;
    }

    public getLocalizedTitle(data) {
        const question = Question.fromJSON(data);
        return question.getLocalization(config.locale);
    }

    public onAddChildQuestion(data) {
        const childQuestion = this.createNewQuestion(data.id);
        this.saveTargetQuestion(childQuestion);
    }

    public onAddQuestion() {
        this.isLoading = true ;
        const question = this.createNewQuestion();
        this.saveTargetQuestion(question);
    }

    public saveTargetQuestion(question: Question) {
        this.questionService.save(question)
            .subscribe(info => {
                    question.id = info['id'];
                    this.loadQuestion(question.id);
                    this.dataSource = [];
                    this.loadSource(question.id);
                },
                error => {
                    this.notification.open('Erreur lors de l"ajout de question.', '', {
                        duration: 3000,
                    });
                });
    }

    public createNewQuestion(idQuestionParent?: string) {
        const question = new Question();
        question.idSurvey = this.survey;
        question.questionType = 2;
        if (idQuestionParent) {
            question.idSurveyQuestionParent = idQuestionParent;
        }
        this.displayOptionDetails(question.questionType);
        question.sequence = this.getLastQuestionSequence();
        question.localizations = this.InitNewQuestionLocalization(question.idSurveyQuestionParent);
        this.questions.push(question);
        return question;
    }

    private InitNewQuestionLocalization(idQuestionParent: string, newName: string = '') {
        let parentLocalization = [];
        if (idQuestionParent) {
            parentLocalization = this.questions.filter(parent => parent.id === idQuestionParent) as Question[];
        }
        const localizations = [];
        packageInfo.locale.forEach(language => {
            const languageItem = {
                languageCode: language.toLowerCase(),
                isActive: true,
                name: newName,
                title: parentLocalization[0] ? parentLocalization[0].getLocalization(language.toLowerCase()) : ''
            };
            localizations.push(languageItem);
        });
        return localizations;
    }

    public onMoveUp() {
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

    public onMoveDown() {
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

    public QuestionTypeChanged(data) {
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

    public onQuestionSelected(e) {
        this.isLoading = true;
        if (this.selectedIndex !== e.itemIndex) {

            this.selectedIndex = e.itemIndex;

            this.setNextQuestion();

            this.displayOptionDetails(this.questions[this.selectedIndex].questionType);

            this.loadSource(this.questions[this.selectedIndex].id);
        }
    }

    public onFormUpdated(item, e) {
            if (item !== 'form') {
                this.questions[this.selectedIndex][item] = e.value;
            }
            this.saveQuestion();
    }

    public saveQuestion() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.questionService.save(this.questions[this.selectedIndex]).subscribe();
        }, 1000);
    }

    public moveQuestion() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.questionService.move(this.questions[this.selectedIndex].id, this.questions[this.selectedIndex].sequence).subscribe();
        }, 1000);
    }

    public onRemoveQuestion() {
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

    public onInitNewChoice(e) {
        e.data.isActive = true;
        e.data.idSurveyQuestion = this.questions[this.selectedIndex].id;
        e.data.sequence = this.dataSource.length + 1;
    }

    public addNewQuestionChoice(e) {
        this.choiceService.save(e.data).subscribe(info => {
            this.loadSource(this.questions[this.selectedIndex].id);
        }, error => {
            this.loadSource(this.questions[this.selectedIndex].id);
        });
    }

    public setNextQuestion() {
        this.nextQuestions = [];

        this.addCompleteGroupQuestion();

        this.questions.sort((a, b) => a.sequence > b.sequence ? 1 : -1).forEach((next_question) => {
            if ((next_question.id !== this.questions[this.selectedIndex].id) &&
                (next_question.idSurveyQuestionParent === this.questions[this.selectedIndex].idSurveyQuestionParent)) {
                this.nextQuestions.push(next_question);
            }
        });
    }
    public addCompleteGroupQuestion() {
        const endGroupQuestion = new Question();
        const idParent = this.questions[this.selectedIndex].idSurveyQuestionParent;
        if (idParent) {
            endGroupQuestion.idSurveyQuestionParent = idParent;
            endGroupQuestion.idSurveyQuestionNext = '-1';
            endGroupQuestion.localizations = this.InitNewQuestionLocalization(idParent, this.messages['endGroupQuestion']);
            this.nextQuestions.push(endGroupQuestion);
        }
    }

    public loadQuestion(newId?: string) {
        this.questionService.getAll(this.survey).subscribe(data => {
            this.questions = data;
            this.filteredActiveQuestion();
            if (newId) {
                this.selectedIndex = this.findQuestionIndex(newId);
                this.questions[this.selectedIndex]['selected'] = true;
            } else {
                if (this.selectedIndex > -1) {
                    this.questions.forEach((question, index) => {
                        if (this.selectedIndex > -1 && question.id === this.questions[this.selectedIndex].id) {
                            this.questions[index]['selected'] = true;
                        }
                    });
                }
            }
        });
    }

    public filteredActiveQuestion() {
        this.questions = this.questions.filter((item) => {
            return (item.isActive);
        });
    }

    public onMultiLangValueChanged(item, e) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.onFormUpdated(item, e);
        }, 1500);

        this.treeViewQuestion.instance.option('dataSource', this.questions);
    }

    public displayOptionDetails(questionType) {
        if (questionType === 1) {
            this.optionsChoiceVisible = true;
        } else {
            this.optionsChoiceVisible = false;
        }
    }

    public getLastQuestionSequence() {
        if (this.questions.length > 0) {
            return this.questions[this.questions.length - 1].sequence + 1;
        } else {
            return 1;
        }
    }

    private findQuestionIndex(idQuestion: string) {
        const questionCount = this.questions.length;
        for (let index = 0; index < questionCount; index++) {
            if (this.questions[index].id === idQuestion) {
                return index;
            }
        }
    }

    public occurrenceValidation() {
        if (this.questions[this.selectedIndex].maxOccurrence < this.questions[this.selectedIndex].minOccurrence) {
            return false;
        }
        return true;
    }
}
