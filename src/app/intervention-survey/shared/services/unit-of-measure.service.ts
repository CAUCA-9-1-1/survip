import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {UnitOfMeasure} from '../models/unit-of-measure';

@Injectable()
export class UnitOfMeasureService {

  private url = 'api/unit-of-measure';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getList(): Promise<UnitOfMeasure[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as UnitOfMeasure[])
      .catch(this.handleError);
  }
}
