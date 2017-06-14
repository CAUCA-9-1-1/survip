import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {Region} from '../models/region.model';

@Injectable()
export class RegionService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('region').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(region: Region) {
    return this.http.post(
      'region',
      JSON.stringify(region)
    ).map((response: Response) => response.json());
  }

  public update(region: Region) {
    return this.http.put(
      'region',
      JSON.stringify(region)
    ).map((response: Response) => response.json());
  }

  public remove(idRegion: string) {
    return this.http.delete('region/' + idRegion).map((response: Response) => response.json());
  }
}
