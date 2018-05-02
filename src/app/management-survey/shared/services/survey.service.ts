import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Survey} from '../models/survey.model';
import {RequestService} from '../../../shared/services/request.service';

@Injectable()
export class SurveyService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<Survey[]>(this.apiUrl + 'Survey', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(survey: Survey) {
        return this.http.post(
            this.apiUrl + 'Survey',
            JSON.stringify(survey),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(id: string) {
        return this.http.delete(this.apiUrl + 'Survey/' + id, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
