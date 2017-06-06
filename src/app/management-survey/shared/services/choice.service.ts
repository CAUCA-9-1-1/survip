import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {Choice} from '../models/choice.model';

@Injectable()
export class ChoiceService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll(id_question: string) {
    return this.http.get('surveychoice/' + id_question).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/survey');
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
