import { Injectable, Injector } from '@angular/core';
import { RequestService } from '../../../shared/services/request.service';
import { Observable } from 'rxjs';
import { Objective } from '../../../statistics/shared/models/objective.model';

@Injectable()
export class ObjectivesService extends RequestService {

  constructor(injector: Injector) {
    super(injector);
  }

  getAll(isHighRisk: boolean): Observable<Objective[]> {
    return this.get('Statistics/Objectives/Risk/' + isHighRisk);
  }

  save(objective: Objective): Observable<string> {
    return this.post('Statistics/Objectives', objective);
  }

  remove(idObjective: string): Observable<boolean> {
    return this.delete('Statistics/Objectives/' + idObjective);
  }
}
