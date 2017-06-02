import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {Survey} from '../models/survey.model';

@Injectable()
export class SurveyService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'survey', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/survey');
      return result;
    });
  }

  public update(survey: Survey) {
    return this.http.put(
      this.host + 'survey',
      JSON.stringify(survey),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
