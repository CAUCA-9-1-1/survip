import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {Country} from '../models/country.model';

@Injectable()
export class CountryService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('country').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(country: Country) {
    return this.http.post(
      'country',
      JSON.stringify(country)
    ).map((response: Response) => response.json());
  }

  public update(country: Country) {
    return this.http.put(
      'country',
      JSON.stringify(country),
    ).map((response: Response) => response.json());
  }

  public remove(idCountry: string) {
    return this.http.delete('country/' + idCountry).map((response: Response) => response.json());
  }
}
