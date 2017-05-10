import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AlarmPanelType} from '../../../intervention-survey/shared/models/alarm-panel-type';

@Injectable()
export class AlarmPanelTypeService {
  private url = 'api/alarm-panel-type';

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getList(): Promise<AlarmPanelType[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as AlarmPanelType[])
      .catch(this.handleError);
  }

}
