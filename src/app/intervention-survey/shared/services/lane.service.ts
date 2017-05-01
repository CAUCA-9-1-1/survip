import {Injectable, Input} from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Lane } from '../models/lane';

@Injectable()
export class LaneService implements ServiceForListInterface {
  private laneUrl = 'api/lanes';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }
  getList(): Promise<Lane[]> {
    return this.http.get(this.laneUrl)
      .toPromise()
      .then(response => response.json().data as Lane[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
