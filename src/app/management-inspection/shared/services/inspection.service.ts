import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Inspection} from '../models/inspection.model';


@Injectable()
export class InspectionService {

  constructor(private http: HttpClient) { }

  public getAll() {
    /*return this.http.get('inspection').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public assign(inspection: Inspection) {
    /*return this.http.post(
      'inspection',
      JSON.stringify(inspection)
    ).map((response: Response) => response.json());*/
  }

  public update(inspection: Inspection) {
    /*return this.http.put(
      'inspection',
      JSON.stringify(inspection)
    ).map((response: Response) => response.json());*/
  }

  public complete(idInspection: string) {
    /*const inspection = {
      idInspection: idInspection,
      isCompleted: true
    };

    return this.http.put(
      'inspection',
      JSON.stringify(inspection)
    ).map((response: Response) => response.json());*/
  }

  public remove(idInspection: string) {
    // return this.http.delete('inspection/' + idInspection).map((response: Response) => response.json());
  }
}
