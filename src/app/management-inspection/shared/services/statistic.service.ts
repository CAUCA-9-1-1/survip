import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';

@Injectable()
export class StatisticService {

  constructor(private http: HttpService) { }

  public get(stat: string) {
    return this.http.get('inspectionstatistic/' + stat).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }
}
