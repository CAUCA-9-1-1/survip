import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UnitOfMeasure} from '../models/unit-of-measure.model';


@Injectable()
export class UnitOfMeasureService {

  constructor(private http: HttpClient) { }

  public getAll(type?: string) {
    /*return this.http.get('unitofmeasure' + (type ? '/' + type : '')).map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public create(unit: UnitOfMeasure) {
    /*return this.http.post(
      'unitofmeasure',
      JSON.stringify(unit)
    ).map((response: Response) => response.json());*/
  }

  public update(unit: UnitOfMeasure) {
    /*return this.http.put(
      'unitofmeasure',
      JSON.stringify(unit),
    ).map((response: Response) => response.json());*/
  }

  public remove(idUnitOfMeasure: string) {
    // return this.http.delete('unitofmeasure/' + idUnitOfMeasure).map((response: Response) => response.json());
  }
}
