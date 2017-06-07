import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http.service';
import {Country} from '../models/country.model';

@Injectable()
export class CountryService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('country').map((response: Response) => {
      const result = response.json();

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
