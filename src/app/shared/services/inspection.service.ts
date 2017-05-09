import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import { BaseService } from '../../core/services/base.service';
import { Inspection} from '../interfaces/inspection.interface';

@Injectable()
export class InspectionService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getAll() {
    return this.http.get('api/inspection', this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/intervention/maps');
      return result.data;
    });
  }
}
