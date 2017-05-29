import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import { BaseService } from '../../../core/base.service';
import { Country } from '../models/country.model';

@Injectable()
export class CountryService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'country', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(country: Country) {
    return this.http.put(
      this.host + 'country',
      JSON.stringify(country),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
