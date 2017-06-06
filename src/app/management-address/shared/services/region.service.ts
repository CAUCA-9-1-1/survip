import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {Region} from '../models/region.model';

@Injectable()
export class RegionService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('region').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(region: Region) {
    return this.http.put(
      'region',
      JSON.stringify(region)
    ).map((response: Response) => response.json());
  }
}
