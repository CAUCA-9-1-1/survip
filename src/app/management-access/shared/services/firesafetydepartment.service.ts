import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {FireSafetyDepartment} from '../models/firesafetydepartment.model';

@Injectable()
export class FireSafetyDepartmentService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'firesafetydepartment', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }

  public update(dept: FireSafetyDepartment) {
    return this.http.put(
      this.host + 'firesafetydepartment',
      JSON.stringify(dept),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
