import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {AlarmPanelType} from '../models/alarm-panel-type.model';

@Injectable()
export class AlarmPanelTypeService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('alarmpaneltype').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public get(idAlarmPanelType: string) {
    return this.http.get('alarmpaneltype/' + idAlarmPanelType).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(type: AlarmPanelType) {
    return this.http.post(
      'alarmpaneltype',
      JSON.stringify(type)
    ).map((response: Response) => response.json());
  }

  public update(type: AlarmPanelType) {
    return this.http.put(
      'alarmpaneltype',
      JSON.stringify(type),
    ).map((response: Response) => response.json());
  }

  public remove(idAlarmPanelType: string) {
    return this.http.delete('alarmpaneltype/' + idAlarmPanelType).map((response: Response) => response.json());
  }
}
