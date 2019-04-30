import { Injectable, Injector } from '@angular/core';
import { RequestService } from '../../../shared/services/request.service';
import { Observable } from 'rxjs/Observable';
import { Objective } from '../../../statistics/shared/models/objective.model';

@Injectable()
export class ObjectivesService extends RequestService {

  constructor(injector: Injector) {
    super(injector);
  }

  getLocalized(idFireSafetyDeparment: string): Observable<Objective[]> {
    return this.get('Objectives/' + idFireSafetyDeparment);
  }

  save(objective: Objective): Observable<any> {
    return this.post('Objectives/', objective);
  }

  remove(id: string): Observable<boolean> {
    console.log(id);
    return this.delete('Objectives/' + id);
  }
}
