import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Question } from '../models/question.model';

@Injectable()
export class QuestionService {

    constructor(private http: HttpClient) { }

    public getAll(id_survey: string) {
        return this.http.get('surveyquestion/' + id_survey + '/true').pipe(
            map(result => {
                return result['data'];
            })
        );
    }

    public create(question: Question) {
        return this.http.post(
            'surveyquestion',
            JSON.stringify(question)
        );
    }

    public update(question: Question) {
        return this.http.put(
            'surveyquestion',
            JSON.stringify(question)
        );
    }

    public remove(idSurveyQuestion: string) {
        return this.http.delete('surveyquestion/' + idSurveyQuestion);
    }

    public move(idSurveyQuestion, step) {
        return this.http.put(
            'surveyquestion',
            JSON.stringify({
                idSurveyQuestion: idSurveyQuestion,
                step: step,
            })
        );
    }
}
