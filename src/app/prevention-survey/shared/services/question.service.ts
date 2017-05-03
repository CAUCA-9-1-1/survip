import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import { BaseService } from '../../../shared/base.service';
import { Question } from '../models/question.model';

@Injectable()
export class QuestionService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getAll() {
    return this.http.get('api/prevention-survey', this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/prevention/survey');
      return result;
    });
  }

  get(id: string) {
    return this.http.get('api/prevention-survey/?idSurvey=' + id, this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/prevention/survey');
      return result.data[0];
    });
  }
}
