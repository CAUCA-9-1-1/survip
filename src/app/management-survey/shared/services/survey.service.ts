import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {Survey} from '../models/survey.model';


@Injectable()
export class SurveyService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<Survey[]> {
        return this.get('Survey');
    }

    localized(): Observable<Survey[]> {
        return this.get('Survey/localized');
    }

    save(survey: Survey) {
        return this.post('Survey', survey);
    }

    remove(id: string) {
        return this.delete('Survey/' + id);
    }

    copySurvey(idSurvey: string) {
        return this.post('Survey/CopySurvey', idSurvey);
    }
}
