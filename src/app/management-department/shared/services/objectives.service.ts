import { Injectable, Injector } from '@angular/core';
import { RequestService } from '../../../shared/services/request.service';
import { Observable } from 'rxjs/Observable';
import { Objective } from '../../../statistics/shared/models/objective.model';

@Injectable()
export class ObjectivesService extends RequestService {

  constructor(injector: Injector) {
    super(injector);
  }

  getAll(): Observable<Objective[]> {
    return this.get('Objectives');
  }

  save(objective: Objective): Observable<Objective[]> {
    return this.post('Objectives/', objective);
  }

  remove(idObjective: string): Observable<boolean> {
    return this.delete('Objectives/' + idObjective);
  }
}
