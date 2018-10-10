import {WithLocalization} from '../../../shared/models/with-localization';

export class Question extends WithLocalization {
    idSurvey: string;
    idSurveyQuestionNext: string;
    sequence: number;
    questionType: number;
    idSurveyQuestionParent: string;
    maxOccurrence = 0;
    minOccurrence = 0;
    expanded = true;

    static fromJSON(data: object): Question {
        const question = new Question();
        return Object.assign(question, data);
    }
}

export enum SurveyQuestionTypeEnum {
    choiceAnswer = 1,
    textAnswer = 2,
    dateAnswer = 3,
    groupedQuestion = 4
};
