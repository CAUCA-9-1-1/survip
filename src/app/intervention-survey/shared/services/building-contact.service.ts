import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { BuildingContact } from '../models/building-contact';

@Injectable()
export class BuildingContactService {
  private url = 'api/building-contacts';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }
  getList(): Promise<BuildingContact[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as BuildingContact[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
