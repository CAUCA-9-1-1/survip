import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {ConstructionType} from '../../../intervention-survey/shared/models/construction-type';

@Injectable()
export class ConstructionTypeService {
  private url = 'api/construction-type';

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getList(): Promise<ConstructionType[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as ConstructionType[])
      .catch(this.handleError);
  }
}
