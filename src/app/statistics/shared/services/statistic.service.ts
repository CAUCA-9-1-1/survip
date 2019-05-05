import { Injectable, Injector } from '@angular/core';
import { RequestService } from '../../../shared/services/request.service';
import { Observable } from 'rxjs/Observable';
import { InspectionForStatistics } from '../models/inspection-for-statistics.model';

@Injectable()
export class StatisticService extends RequestService {

  constructor(injector: Injector) {
    super(injector);
  }

  getInspectionVisitsStatistics(): Observable<InspectionForStatistics[]> {
    return this.get('Statistics/Visits');
  }
}
