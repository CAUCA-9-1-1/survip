import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {AlarmPanel} from '../models/alarm-panel.model';

@Injectable()
export class AlarmPanelService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('alarmpanel').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public get(idAlarmPanel: string) {
    return this.http.get('alarmpanel/' + idAlarmPanel).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(panel: AlarmPanel) {
    return this.http.post(
      'alarmpanel',
      JSON.stringify(panel)
    ).map((response: Response) => response.json());
  }

  public update(panel: AlarmPanel) {
    return this.http.put(
      'alarmpanel',
      JSON.stringify(panel),
    ).map((response: Response) => response.json());
  }

  public remove(idAlarmPanel: string) {
    return this.http.delete('alarmpanel/' + idAlarmPanel).map((response: Response) => response.json());
  }
}
