import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';

@Injectable()
export class StatisticService {

  constructor(private http: HttpService) { }

  public get(stat: string) {
    return this.http.get('webuserstatistic/' + stat).map((response: Response) => {
      const result = response.json();

      return result;
    });
  }
}
