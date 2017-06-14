import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {Question} from '../models/question.model';

@Injectable()
export class QuestionService {

  constructor(private http: HttpService) { }

  public getAll(id_survey: string) {
    return this.http.get('surveyquestion/' + id_survey + '/true').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(question: Question) {
    return this.http.post(
      'surveyquestion',
      JSON.stringify(question)
    ).map((response: Response) => response.json());
  }

  public update(question: Question) {
    return this.http.put(
      'surveyquestion',
      JSON.stringify(question)
    ).map((response: Response) => response.json());
  }

  public remove(idSurveyQuestion: string) {
    return this.http.delete('surveyquestion/' + idSurveyQuestion).map((response: Response) => response.json());
  }

  public move(idSurveyQuestion, step) {
    return this.http.put(
      'surveyquestion',
      JSON.stringify({
        idSurveyQuestion: idSurveyQuestion,
        step: step,
      })
    ).map((response: Response) => response.json());
  }
}
