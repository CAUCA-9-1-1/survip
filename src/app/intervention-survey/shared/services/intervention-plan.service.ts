import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {InterventionPlan} from '../models/intervention-plan';
import {BaseService} from '../../../core/services/base.service';

@Injectable()
export class InterventionPlanService extends BaseService {
  private url = 'api/intervention-plan';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    super();
  }

  get(id: string) {
    return this.http.get(this.url + '/' + id, this.authorization()).map((response: Response) => {
      const result = response.json();
      return result.data;
      });
  }

  /*update(intervention: InterventionPlan): Promise<InterventionPlan> {
    const url = this.url + '/' + intervention.id;
    return this.http
      .put(url, JSON.stringify(intervention), {headers: this.headers})
      .toPromise()
      .then(() => intervention)
      .catch(this.handleError);
  }

  delete(intervention: InterventionPlan): Promise<void> {
    const url = `${this.url}/${intervention.id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }*/
}
