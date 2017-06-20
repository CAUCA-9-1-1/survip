import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {Choice} from '../models/choice.model';

@Injectable()
export class ChoiceService {

  constructor(private http: HttpService) { }

  public getAll(id_question: string) {
    return this.http.get('surveychoice/' + id_question + '/true').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(choice: Choice) {
    return this.http.post(
      'surveychoice',
      JSON.stringify(choice)
    ).map((response: Response) => response.json());
  }

  public update(choice: Choice) {
    return this.http.put(
      'surveychoice',
      JSON.stringify(choice)
    ).map((response: Response) => response.json());
  }

  public remove(idSurveyChoice: string) {
    return this.http.delete('surveychoice/' + idSurveyChoice).map((response: Response) => response.json());
  }
}
