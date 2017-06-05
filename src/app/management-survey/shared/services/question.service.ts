import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {Question} from '../models/question.model';

@Injectable()
export class QuestionService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll(id_survey: string) {
    return this.http.get(this.host + 'surveyquestion/' + id_survey, this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/survey');
      return result;
    });
  }

  public update(question: Question) {
    return this.http.put(
      this.host + 'surveyquestion',
      JSON.stringify(question),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
