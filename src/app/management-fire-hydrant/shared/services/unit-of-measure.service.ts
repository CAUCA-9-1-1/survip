import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {UnitOfMeasure} from '../models/unit-of-measure.model';

@Injectable()
export class UnitOfMeasureService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('unitofmeasure').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public get(idUnitOfMeasure: string) {
    return this.http.get('unitofmeasure/' + idUnitOfMeasure).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(unit: UnitOfMeasure) {
    return this.http.post(
      'unitofmeasure',
      JSON.stringify(unit)
    ).map((response: Response) => response.json());
  }

  public update(unit: UnitOfMeasure) {
    return this.http.put(
      'unitofmeasure',
      JSON.stringify(unit),
    ).map((response: Response) => response.json());
  }

  public remove(idUnitOfMeasure: string) {
    return this.http.delete('unitofmeasure/' + idUnitOfMeasure).map((response: Response) => response.json());
  }
}
