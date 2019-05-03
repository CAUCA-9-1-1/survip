import { Injectable, Injector } from '@angular/core';
import { RequestService } from '../../../shared/services/request.service';
import { Observable } from 'rxjs/Observable';
import { Statistics } from '../models/statistics.model';

@Injectable()
export class StatisticService extends RequestService {

  constructor(injector: Injector) {
    super(injector);
  }

  getAll(): Observable<Statistics> {
    return this.get('Objectives/Statistics');
  }

  getValuesForTable(idFireSafetyDeparment: string): Observable<Statistics> {
    return this.get('Objectives/Statistics/' + idFireSafetyDeparment);
  }

}
