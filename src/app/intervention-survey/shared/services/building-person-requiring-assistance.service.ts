import { Injectable } from '@angular/core';
import {BuildingPersonRequiringAssistance} from '../models/building-person-requiring-assistance';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BuildingPersonRequiringAssistanceService {
  private url = 'api/building-person-requiring-assistance';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  getList(): Promise<BuildingPersonRequiringAssistance[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as BuildingPersonRequiringAssistance[])
      .catch(this.handleError);
  }

  update(pnap: BuildingPersonRequiringAssistance): Promise<BuildingPersonRequiringAssistance> {
    const url = this.url + '/' + pnap.id;
    return this.http
      .put(url, JSON.stringify(pnap), {headers: this.headers})
      .toPromise()
      .then(() => pnap)
      .catch(this.handleError);
  }

  delete(pnap: BuildingPersonRequiringAssistance): Promise<void> {
    const url = `${this.url}/${pnap.id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
