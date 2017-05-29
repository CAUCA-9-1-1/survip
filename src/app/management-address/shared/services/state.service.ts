import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {State} from '../models/state.model';

@Injectable()
export class StateService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'state', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(state: State) {
    return this.http.put(
      this.host + 'state',
      JSON.stringify(state),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
