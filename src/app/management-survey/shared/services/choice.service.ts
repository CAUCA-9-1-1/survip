import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Choice } from '../models/choice.model';
import {RequestService} from '../../../shared/services/request.service';

@Injectable()
export class ChoiceService extends RequestService  {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll(idSurveyQuestion: string) {
        return this.http.get<Choice[]>(this.apiUrl + 'SurveyQuestionChoice/SurveyQuestion/' + idSurveyQuestion, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(surveyQuestionChoice: Choice) {
        return this.http.post(
            this.apiUrl + 'SurveyQuestionChoice',
            JSON.stringify(surveyQuestionChoice),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idSurveyQuestionChoice: string) {
        return this.http.delete(this.apiUrl + 'SurveyQuestionChoice/' + idSurveyQuestionChoice, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    deleteQuestionsChoices(idSurveyQuestion: string) {
        return this.http.delete(this.apiUrl + 'SurveyQuestionChoice/SurveyQuestion/' + idSurveyQuestion, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
