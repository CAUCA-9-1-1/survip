import { Injectable } from '@angular/core';
import {HazardousMaterial} from '../models/hazardous-material';
import {Http} from '@angular/http';

@Injectable()
export class HazardousMaterialService {

  private url = 'api/hazardous-material';

  constructor(private http: Http) { }

  getList(): Promise<HazardousMaterial[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as HazardousMaterial[])
      .catch(this.handleError);
  }

  getDescriptionById(id: string): Promise<string> {
    return this.http.get(this.url + '?id=' + id)
      .toPromise()
      .then(response => this.getName(response.json().data as HazardousMaterial[]))
      .catch(this.handleError);
  }

  private getName(lanes: HazardousMaterial[]): string {
    return lanes[0].description;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
