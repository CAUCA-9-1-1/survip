import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {InterventionPlanFireHydrant} from '../models/intervention-plan-fire-hydrant';

@Injectable()
export class InterventionPlanFireHydrantService {

  private url = 'api/intervention-plan-fire-hydrant';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  getList(): Promise<InterventionPlanFireHydrant[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as InterventionPlanFireHydrant[])
      .catch(this.handleError);
  }

  update(mat: InterventionPlanFireHydrant): Promise<InterventionPlanFireHydrant> {
    const url = this.url + '/' + mat.id;
    return this.http
      .put(url, JSON.stringify(mat), {headers: this.headers})
      .toPromise()
      .then(() => mat)
      .catch(this.handleError);
  }

  delete(mat: InterventionPlanFireHydrant): Promise<void> {
    const url = `${this.url}/${mat.id}`;
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
