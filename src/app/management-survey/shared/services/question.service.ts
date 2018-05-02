import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RequestService} from '../../../shared/services/request.service';
import {Question} from '../models/question.model';
import {Survey} from '../models/survey.model';

@Injectable()
export class QuestionService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll(id_survey: string) {
        return this.http.get<Survey[]>(this.apiUrl + 'SurveyQuestion/Survey/' + id_survey, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(surveyQuestion: Question) {
        return this.http.post(
            this.apiUrl + 'SurveyQuestion',
            JSON.stringify(surveyQuestion),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(id: string) {
        return this.http.delete(this.apiUrl + 'SurveyQuestion/' + id, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    move(id, step) {
        return this.http.post(
            this.apiUrl + 'SurveyQuestion',
            JSON.stringify({
                idSurveyQuestion: id,
                step: step
            }),
            {headers: this.headers}
        ).catch((error: HttpErrorResponse) => this.error(error));
    }
}


