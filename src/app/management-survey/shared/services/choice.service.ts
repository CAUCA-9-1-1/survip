import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {Choice} from '../models/choice.model';


@Injectable()
export class ChoiceService extends RequestService  {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(idSurveyQuestion: string): Observable<Choice[]> {
        return this.get('SurveyQuestionChoice/SurveyQuestion/' + idSurveyQuestion);
    }

    save(surveyQuestionChoice: Choice) {
        return this.post('SurveyQuestionChoice', surveyQuestionChoice);
    }

    remove(idSurveyQuestionChoice: string) {
        return this.delete('SurveyQuestionChoice/' + idSurveyQuestionChoice);
    }

    deleteQuestionsChoices(idSurveyQuestion: string) {
        return this.delete('SurveyQuestionChoice/SurveyQuestion/' + idSurveyQuestion);
    }
}
