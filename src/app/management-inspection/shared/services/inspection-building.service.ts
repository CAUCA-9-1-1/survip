import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {InspectionBuilding} from '../models/inspection-building.model';

@Injectable()
export class InspectionBuildingService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('inspectionbuilding').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public update(building: InspectionBuilding) {
    return this.http.put(
      'inspectionbuilding',
      JSON.stringify(building)
    ).map((response: Response) => response.json());
  }
}
