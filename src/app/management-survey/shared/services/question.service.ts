import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {Question} from '../models/question.model';

@Injectable()
export class QuestionService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll(id_survey: string) {
    return this.http.get('surveyquestion/' + id_survey).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/survey');
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
