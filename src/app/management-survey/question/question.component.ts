import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material';
import {DxTreeViewComponent} from 'devextreme-angular';
import {confirm, alert} from 'devextreme/ui/dialog';

import config from '../../../assets/config/config.json';
import packageInfo from '../../../assets/config/package.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Question, SurveyQuestionTypeEnum} from '../shared/models/question.model';
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

    public questionTypeEnum = SurveyQuestionTypeEnum;
    public questions: Question[] = [];
    public nextQuestions: Question[] = [];
    public selectedIndex = -1;
    public editing: object = {};
    public timer = null;
    public messages: object = {};
    public isLoading = false;
    public optionsChoiceVisible = true;
    public questionTypeOptions = {
        dataSource: [], displayExpr: 'text', valueExpr: 'value',
        onValueChanged: this.QuestionTypeChanged.bind(this)
    };
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
            'endGroupQuestion', 'groupedQuestionTypeChangedWarning', 'warning'])
            .subscribe(labels => {
                this.messages = labels;
            });
        this.questionTypeOptions.dataSource = this.questionService.getEnumsKeysCollection(SurveyQuestionTypeEnum);
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
        this.isLoading = true;
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

    public createNewQuestion(idQuestionParent: string = null) {
        const question = new Question();
        question.idSurvey = this.survey;
        question.questionType = SurveyQuestionTypeEnum.textAnswer;
        if (idQuestionParent) {
            question.idSurveyQuestionParent = idQuestionParent;
        }
        this.displayOptionDetails(question.questionType);
        question.sequence = this.getLastQuestionSequence(idQuestionParent);
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
        const previousSequencedQuestion = this.questions
            .filter(question => question.sequence < this.questions[this.selectedIndex].sequence &&
                question.idSurveyQuestionParent === this.questions[this.selectedIndex].idSurveyQuestionParent)
            .sort((a, b) => b.sequence > a.sequence ? 1 : -1);

        if (previousSequencedQuestion[0]) {
            const idToFollow = this.questions[this.selectedIndex].id;
            const sequence1 = this.questions[this.selectedIndex].sequence;
            const sequence2 = previousSequencedQuestion[0].sequence;

            this.questions[this.selectedIndex].sequence = sequence2;
            previousSequencedQuestion[0].sequence = sequence1;

            this.orderQuestion(this.questions[this.selectedIndex], previousSequencedQuestion[0]);

            this.selectedIndex = this.findQuestionIndex(idToFollow);
            this.questions[this.selectedIndex]['selected'] = true;

            this.moveQuestion();
        }
    }

    public onMoveDown() {
        const nextSequencedQuestion = this.questions
            .filter(question => question.sequence > this.questions[this.selectedIndex].sequence &&
                question.idSurveyQuestionParent === this.questions[this.selectedIndex].idSurveyQuestionParent);

        if (nextSequencedQuestion[0]) {
            const idToFollow = this.questions[this.selectedIndex].id;
            const sequence1 = this.questions[this.selectedIndex].sequence;
            const sequence2 = nextSequencedQuestion[0].sequence;

            this.questions[this.selectedIndex].sequence = sequence2;
            nextSequencedQuestion[0].sequence = sequence1;

            this.orderQuestion(this.questions[this.selectedIndex], nextSequencedQuestion[0]);

            this.selectedIndex = this.findQuestionIndex(idToFollow);
            this.questions[this.selectedIndex]['selected'] = true;

            this.moveQuestion();
        }
    }

    private orderQuestion(question1: Question, question2: Question) {
        const index1 = this.findQuestionIndex(question1.id);
        const index2 = this.findQuestionIndex(question2.id);

        this.questions[index1] = question2;
        this.questions[index2] = question1;
    }

    public QuestionTypeChanged(data) {
        this.displayOptionDetails(data.value);

        if (this.questionTypeChoiceCanceled || this.isLoading) {
            this.questionTypeChoiceCanceled = false;
            this.isLoading = false;
            return;
        }

        this.choiceQuestionTypeChanged(data);

        this.groupedQuestionTypeChanged(data);
    }

    private choiceQuestionTypeChanged(data) {
        if ((data.previousValue === SurveyQuestionTypeEnum.choiceAnswer) && (!this.isLoading) && (this.dataSource.length > 0)) {
            confirm(this.messages['removeQuestionChoices'], this.messages['question']).then((result) => {
                if (!result) {
                    this.questionTypeChoiceCanceled = true;
                    data.component.option('value', data.previousValue);
                    this.displayOptionDetails(data.previousValue);
                } else {
                    this.choiceService.deleteQuestionsChoices(this.questions[this.selectedIndex].id)
                        .subscribe(deleteResult => console.log('Suppression des choix de réponse: ', deleteResult));
                }
            });
        }
    }

    private groupedQuestionTypeChanged(data) {
        if ((data.previousValue === SurveyQuestionTypeEnum.groupedQuestion) &&
            (!this.isLoading) &&
            (this.questions.filter(q => q.idSurveyQuestionParent === this.questions[this.selectedIndex].id).length > 0)) {

            alert(this.messages['groupedQuestionTypeChangedWarning'], this.messages['warning']);
            this.questionTypeChoiceCanceled = true;
            data.component.option('value', data.previousValue);
        }
    }

    public onQuestionSelected(e) {
        if (this.selectedIndex !== e.itemIndex) {

            if (this.selectedIndex > -1) {
                this.isLoading = true;
            }

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
            console.log('save', this.questions[this.selectedIndex]);
        }, 500);
    }

    public moveQuestion() {
        this.questionService.move(this.questions[this.selectedIndex].id, this.questions[this.selectedIndex].sequence).subscribe();
    }

    public onRemoveQuestion() {
        if (this.selectedIndex > -1) {
            confirm(this.messages['removeQuestion'], this.messages['question']).then((result) => {
                if (result) {
                    this.questionService.remove(this.questions[this.selectedIndex].id)
                        .subscribe(() => {
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

        this.questions.forEach((next_question) => {
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
            endGroupQuestion.id = '00000000-0000-0000-0000-000000000000';
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
        this.questions[this.selectedIndex][item] = e.value;
        this.saveQuestion();
        this.treeViewQuestion.instance.option('dataSource', this.questions);
    }

    public displayOptionDetails(questionType) {
        if (questionType === SurveyQuestionTypeEnum.choiceAnswer) {
            this.optionsChoiceVisible = true;
        } else {
            this.optionsChoiceVisible = false;
        }
    }

    public getLastQuestionSequence(idParent: string = null) {
        const filteredList = this.questions.filter(question => question.idSurveyQuestionParent === idParent);
        filteredList.sort((a, b) => b.sequence > a.sequence ? 1 : -1);
        if (filteredList.length > 0) {
            return filteredList[0].sequence + 1;
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
