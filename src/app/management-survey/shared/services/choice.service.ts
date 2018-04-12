import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Choice } from '../models/choice.model';


@Injectable()
export class ChoiceService {

    constructor(private http: HttpClient) { }

    public getAll(id_question: string) {
        return this.http.get('surveychoice/' + id_question + '/true').pipe(
            map((result) => {
                return result['data'];
            })
        );
    }

    public create(choice: Choice) {
        return this.http.post(
            'surveychoice',
            JSON.stringify(choice)
        );
    }

    public update(choice: Choice) {
        return this.http.put(
            'surveychoice',
            JSON.stringify(choice)
        );
    }

    public remove(idSurveyChoice: string) {
        return this.http.delete('surveychoice/' + idSurveyChoice);
    }
}
