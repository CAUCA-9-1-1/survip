import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http.service';
import {County} from '../models/county.model';

@Injectable()
export class CountyService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('county').map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public update(county: County) {
    return this.http.put(
      'county',
      JSON.stringify(county),
    ).map((response: Response) => response.json());
  }
}
