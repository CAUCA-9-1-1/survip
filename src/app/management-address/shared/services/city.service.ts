import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {City} from '../models/city.model';

@Injectable()
export class CityService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'city', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(city: City) {
    return this.http.put(
      this.host + 'city',
      JSON.stringify(city),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
