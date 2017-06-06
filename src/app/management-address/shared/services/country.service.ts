import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import { BaseService } from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import { Country } from '../models/country.model';

@Injectable()
export class CountryService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('country').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(country: Country) {
    return this.http.put(
      'country',
      JSON.stringify(country),
    ).map((response: Response) => response.json());
  }
}
