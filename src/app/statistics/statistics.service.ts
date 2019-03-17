import { Injectable, Injector } from '@angular/core';
import { RequestService } from '../shared/services/request.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class StatisticsService extends RequestService {

  constructor(injector: Injector) {
    super(injector);
  }

  getForSSI(id: string): Observable<any> {
    return this.get('Webuser/Active/Departments/' + id);
}
}
