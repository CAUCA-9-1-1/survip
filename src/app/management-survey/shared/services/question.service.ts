import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {Question} from '../models/question.model';

@Injectable()
export class QuestionService {

  constructor(private http: HttpService) { }

  public getAll(id_survey: string) {
    return this.http.get('surveyquestion/' + id_survey).map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public update(question: Question) {
    return this.http.put(
      'surveyquestion',
      JSON.stringify(question)
    ).map((response: Response) => response.json());
  }
}
