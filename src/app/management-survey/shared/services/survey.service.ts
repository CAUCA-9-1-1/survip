import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Survey } from '../models/survey.model';

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get('survey').pipe(
      map((result) => {
        return result['data'];
      })
    );
  }

  public update(survey: Survey) {
    return this.http.put(
      'survey',
      JSON.stringify(survey)
    );
  }
}
