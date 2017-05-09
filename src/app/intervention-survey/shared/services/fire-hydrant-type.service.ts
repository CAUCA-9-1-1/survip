import { Injectable } from '@angular/core';
import {FireHydrantType} from '../models/fire-hydrant-type';
import {Http} from '@angular/http';

@Injectable()
export class FireHydrantTypeService {
  private url = 'api/fire-hydrant-type';

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getList(): Promise<FireHydrantType[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as FireHydrantType[])
      .catch(this.handleError);
  }

}
