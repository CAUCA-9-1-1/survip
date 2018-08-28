import {WithLocalization} from '../../../shared/models/with-localization';


export class Question extends WithLocalization {
  idSurvey: string;
  idSurveyQuestionNext: string;
  sequence: number;
  questionType: number;
  idSurveyQuestionParent: string;

    static fromJSON(data: object): Question {
        const question = new Question();
        return Object.assign(question, data);
    }
}
