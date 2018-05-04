
import {WithLocalization} from '../../../shared/models/with-localization';

export class Choice  extends WithLocalization {
  idSurveyQuestion: string;
  sequence: number;
  idSurveyQuestionNext: string;

    static fromJSON(data: object): Choice {
        const choice = new Choice();
        return Object.assign(choice, data);
    }
}
