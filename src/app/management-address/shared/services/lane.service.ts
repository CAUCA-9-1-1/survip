import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {Lane} from '../models/lane.model';

@Injectable()
export class LaneService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('lane').map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public update(lane: Lane) {
    return this.http.put(
      'lane',
      JSON.stringify(lane),
    ).map((response: Response) => response.json());
  }
}