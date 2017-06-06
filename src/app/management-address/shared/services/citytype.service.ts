import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {CityType} from '../models/citytype.model';

@Injectable()
export class CityTypeService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('citytype').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(cityType: CityType) {
    return this.http.put(
      'citytype',
      JSON.stringify(cityType),
    ).map((response: Response) => response.json());
  }
}
