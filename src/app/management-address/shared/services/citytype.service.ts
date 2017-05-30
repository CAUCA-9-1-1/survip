import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {CityType} from '../models/citytype.model';

@Injectable()
export class CityTypeService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'citytype', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(cityType: CityType) {
    return this.http.put(
      this.host + 'citytype',
      JSON.stringify(cityType),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
