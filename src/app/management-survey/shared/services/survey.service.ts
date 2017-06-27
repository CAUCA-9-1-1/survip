import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService, WindowRefService} from 'cause-lib';
import {Survey} from '../models/survey.model';

@Injectable()
export class SurveyService {

  constructor(private http: HttpService, private windowRef: WindowRefService) { }

  public getAll() {
    this.http.get('picture').map((response: Response) => {
      const result = response.json();

      return result.data;
    }).subscribe(data => {
      const img = this.windowRef.nativeDocument.createElement('img');
      img.src = data[1].picture;
      this.windowRef.nativeDocument.querySelector('body').appendChild(img);
    });

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
