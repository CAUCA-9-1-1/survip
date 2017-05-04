import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import { BaseService } from './base.service';
import { Country } from '../../shared/models/country';

@Injectable()
export class CountryService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getAll() {
    return this.http.get('api/country', this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/prevention/survey');
      return result;
    });
  }

  update(country: Country) {
    return this.http.post(
      'api/country',
      JSON.stringify(country),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
