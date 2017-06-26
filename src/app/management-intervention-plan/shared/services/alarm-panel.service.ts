import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {AlarmPanel} from '../models/alarm-panel.model';

@Injectable()
export class AlarmPanelService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('alarmpaneltype').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public get(idAlarmPanel: string) {
    return this.http.get('alarmpaneltype/' + idAlarmPanel).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(type: AlarmPanel) {
    return this.http.post(
      'alarmpaneltype',
      JSON.stringify(type)
    ).map((response: Response) => response.json());
  }

  public update(type: AlarmPanel) {
    return this.http.put(
      'alarmpaneltype',
      JSON.stringify(type),
    ).map((response: Response) => response.json());
  }

  public remove(idAlarmPanel: string) {
    return this.http.delete('alarmpaneltype/' + idAlarmPanel).map((response: Response) => response.json());
  }
}
