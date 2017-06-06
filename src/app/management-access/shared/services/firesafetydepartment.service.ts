import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {FireSafetyDepartment} from '../models/firesafetydepartment.model';

@Injectable()
export class FireSafetyDepartmentService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('firesafetydepartment').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }

  public update(dept: FireSafetyDepartment) {
    return this.http.put(
      'firesafetydepartment',
      JSON.stringify(dept)
    ).map((response: Response) => response.json());
  }
}
