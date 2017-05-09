import { Injectable } from '@angular/core';
import {PersonRequiringAssistanceType} from '../models/person-requiring-assistance-type';
import {Http} from '@angular/http';

@Injectable()
export class PersonRequiringAssistanceTypeService {
  private url = 'api/person-requiring-assistance-type';

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getList(): Promise<PersonRequiringAssistanceType[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as PersonRequiringAssistanceType[])
      .catch(this.handleError);
  }
}
