import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {Building} from '../models/building.model';

@Injectable()
export class BuildingService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('building').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/building');
      return result;
    });
  }

  public update(building: Building) {
    return this.http.put(
      'building',
      JSON.stringify(building),
    ).map((response: Response) => response.json());
  }
}
