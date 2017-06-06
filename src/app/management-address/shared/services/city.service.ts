import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {City} from '../models/city.model';
import {HttpService} from "../../../core/http.service";

@Injectable()
export class CityService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('city').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(city: City) {
    return this.http.put(
      'city',
      JSON.stringify(city),
    ).map((response: Response) => response.json());
  }
}
