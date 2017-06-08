import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {Building} from '../models/building.model';

@Injectable()
export class BuildingService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('building').map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public update(building: Building) {
    return this.http.put(
      'building',
      JSON.stringify(building),
    ).map((response: Response) => response.json());
  }
}
