import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {BuildingHazardousMaterial} from '../models/building-hazardous-material';

@Injectable()
export class BuildingHazardousMaterialService {
  private url = 'api/building-hazardous-material';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  getList(): Promise<BuildingHazardousMaterial[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as BuildingHazardousMaterial[])
      .catch(this.handleError);
  }

  update(mat: BuildingHazardousMaterial): Promise<BuildingHazardousMaterial> {
    const url = this.url + '/' + mat.id;
    return this.http
      .put(url, JSON.stringify(mat), {headers: this.headers})
      .toPromise()
      .then(() => mat)
      .catch(this.handleError);
  }

  delete(mat: BuildingHazardousMaterial): Promise<void> {
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
