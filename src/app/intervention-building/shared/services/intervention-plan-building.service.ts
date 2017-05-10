import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {InterventionPlanBuilding} from '../../../intervention-survey/shared/models/intervention-plan-building';


@Injectable()
export class InterventionPlanBuildingService {
  private url = 'api/intervention-plan-building';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  getInterventionPlanBuilding(id: string): Promise<InterventionPlanBuilding> {
    return this.http.get(this.url + '/' + id)
      .toPromise()
      .then(response => response.json().data as InterventionPlanBuilding)
      .catch(this.handleError);
  }

  update(building: InterventionPlanBuilding): Promise<InterventionPlanBuilding> {
    const url = this.url + '/' + building.id;
    return this.http
      .put(url, JSON.stringify(building), {headers: this.headers})
      .toPromise()
      .then(() => building)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
