import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {Building} from '../models/building.model';

@Injectable()
export class BuildingService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('building').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(building: Building) {
    return this.http.post(
      'building',
      JSON.stringify(building)
    ).map((response: Response) => response.json());
  }

  public update(building: Building) {
    return this.http.put(
      'building',
      JSON.stringify(building),
    ).map((response: Response) => response.json());
  }

  public remove(idBuilding: string) {
    return this.http.delete('building/' + idBuilding).map((response: Response) => response.json());
  }
}
