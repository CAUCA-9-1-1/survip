import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {BaseService} from '../../../core/base.service';
import {Question} from '../models/question.model';

@Injectable()
export class SurveyQuestionService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  getAll(idSurvey: string) {
    return this.http.get('api/survey-question?idSurvey=' + idSurvey, this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/prevention/survey');
      return result;
    });
  }
}
