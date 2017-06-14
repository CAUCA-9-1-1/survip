import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {Inspection} from '../models/inspection.model';

@Injectable()
export class InspectionService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('inspection').map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public update(survey: Inspection) {
    return this.http.put(
      'inspection',
      JSON.stringify(survey)
    ).map((response: Response) => response.json());
  }
}
