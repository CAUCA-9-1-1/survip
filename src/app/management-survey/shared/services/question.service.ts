import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {Question} from '../models/question.model';
import {map} from 'rxjs/operators';


@Injectable()
export class QuestionService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(id_survey: string): Observable<Question[]> {
        return this.get('SurveyQuestion/Survey/' + id_survey)
            .pipe(map(result => {
                const list = [];
                result.forEach((question) => {
                    list.push(Question.fromJSON(question));
                });
                return list;
            }));
    }

    save(surveyQuestion: Question) {
        return this.post('SurveyQuestion', surveyQuestion);
    }

    remove(id: string) {
        return this.delete('SurveyQuestion/' + id);
    }

    move(id: string, sequence: number) {
        return this.post('SurveyQuestion/' + id + '/Sequence/' + sequence, {});
    }

    getEnumsKeysCollection(enumCollection: any): any[] {
        const retValue = [];
        const keys = Object.keys(enumCollection)
                .map(k => enumCollection[k])
                .filter(v => typeof v === 'number') as number[];

        keys.forEach(k => {
            retValue.push({value: k, text:  this.translateService.instant('enumQuestionType.' + enumCollection[k])});
        });
        return retValue;
    }
}


