import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {Survey} from '../models/survey.model';

@Injectable()
export class SurveyService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('survey').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public update(survey: Survey) {
    return this.http.put(
      'survey',
      JSON.stringify(survey)
    ).map((response: Response) => response.json());
  }
}
