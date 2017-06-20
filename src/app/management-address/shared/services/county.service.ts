import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {County} from '../models/county.model';

@Injectable()
export class CountyService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('county').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(county: County) {
    return this.http.post(
      'county',
      JSON.stringify(county)
    ).map((response: Response) => response.json());
  }

  public update(county: County) {
    return this.http.put(
      'county',
      JSON.stringify(county),
    ).map((response: Response) => response.json());
  }

  public remove(idCounty: string) {
    return this.http.delete('county/' + idCounty).map((response: Response) => response.json());
  }
}
