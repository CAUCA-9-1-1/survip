import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {InspectionBuilding} from '../models/inspection-building.model';


@Injectable()
export class InspectionBuildingService {

  constructor(private http: HttpClient) { }

  public getAll() {
    /*return this.http.get('inspectionbuilding').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public update(building: InspectionBuilding) {
    /*return this.http.put(
      'inspectionbuilding',
      JSON.stringify(building)
    ).map((response: Response) => response.json());*/
  }
}
