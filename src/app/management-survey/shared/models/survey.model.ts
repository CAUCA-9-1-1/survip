import {WithLocalization} from '../../../shared/models/with-localization';

export class Survey extends WithLocalization {
  surveyType: string;

    static fromJSON(data: object): Survey {
        const survey = new Survey();

        return Object.assign(survey, data);
    }
}
