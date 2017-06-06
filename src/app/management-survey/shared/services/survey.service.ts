import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {Survey} from '../models/survey.model';

@Injectable()
export class SurveyService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('survey').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/survey');
      return result;
    });
  }

  public update(survey: Survey) {
    return this.http.put(
      'survey',
      JSON.stringify(survey)
    ).map((response: Response) => response.json());
  }
}
