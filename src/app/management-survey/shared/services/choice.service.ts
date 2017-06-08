import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {Choice} from '../models/choice.model';

@Injectable()
export class ChoiceService {

  constructor(private http: HttpService) { }

  public getAll(id_question: string) {
    return this.http.get('surveychoice/' + id_question).map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public update(choice: Choice) {
    return this.http.put(
      'surveychoice',
      JSON.stringify(choice)
    ).map((response: Response) => response.json());
  }
}
