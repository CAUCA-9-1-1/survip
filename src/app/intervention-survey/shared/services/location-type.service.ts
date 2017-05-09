import { Injectable } from '@angular/core';
import {LocationType} from '../models/location-type';
import {Http} from '@angular/http';

@Injectable()
export class LocationTypeService {
  private url = 'api/location-type';

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getList(): Promise<LocationType[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as LocationType[])
      .catch(this.handleError);
  }
}
