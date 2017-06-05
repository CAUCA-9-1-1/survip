import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {Choice} from '../models/choice.model';

@Injectable()
export class ChoiceService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll(id_question: string) {
    return this.http.get(this.host + 'surveychoice/' + id_question, this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/survey');
      return result;
    });
  }

  public update(choice: Choice) {
    return this.http.put(
      this.host + 'surveychoice',
      JSON.stringify(choice),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
