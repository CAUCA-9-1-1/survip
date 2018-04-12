import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {OperatorType} from '../models/operator-type.model';


@Injectable()
export class OperatorTypeService {

  constructor(private http: HttpClient) { }

  public getAll() {
    /*return this.http.get('operatortype').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public get(idOperatorType: string) {
    /*return this.http.get('operatortype/' + idOperatorType).map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public create(type: OperatorType) {
    /*return this.http.post(
      'operatortype',
      JSON.stringify(type)
    ).map((response: Response) => response.json());*/
  }

  public update(type: OperatorType) {
    /*return this.http.put(
      'operatortype',
      JSON.stringify(type),
    ).map((response: Response) => response.json());*/
  }

  public remove(idOperatorType: string) {
    // return this.http.delete('operatortype/' + idOperatorType).map((response: Response) => response.json());
  }
}
