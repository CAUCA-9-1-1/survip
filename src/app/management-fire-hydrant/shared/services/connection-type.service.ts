import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ConnectionType} from '../models/connection-type.model';


@Injectable()
export class ConnectionTypeService {

  constructor(private http: HttpClient) { }

  public getAll() {
    /*return this.http.get('firehydrantconnectiontype').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public get(idConnectionType: string) {
    /*return this.http.get('firehydrantconnectiontype/' + idConnectionType).map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public create(type: ConnectionType) {
    /*return this.http.post(
      'firehydrantconnectiontype',
      JSON.stringify(type)
    ).map((response: Response) => response.json());*/
  }

  public update(type: ConnectionType) {
    /*return this.http.put(
      'firehydrantconnectiontype',
      JSON.stringify(type),
    ).map((response: Response) => response.json());*/
  }

  public remove(idConnectionType: string) {
    // return this.http.delete('firehydrantconnectiontype/' + idConnectionType).map((response: Response) => response.json());
  }
}
