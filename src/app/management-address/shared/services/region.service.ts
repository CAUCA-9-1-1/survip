import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http.service';
import {Region} from '../models/region.model';

@Injectable()
export class RegionService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('region').map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public update(region: Region) {
    return this.http.put(
      'region',
      JSON.stringify(region)
    ).map((response: Response) => response.json());
  }
}
