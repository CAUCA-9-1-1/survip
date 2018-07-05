import {Injectable, Injector} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {RequestService} from '../../../shared/services/request.service';
import {Observable} from 'rxjs/Observable';
import {ResponseContentType} from '@angular/http';


@Injectable()
export class ReportGenerationService extends RequestService {

  constructor(private http: HttpClient, injector: Injector) {
    super(injector);
  }

  generateReport(guid: string) {
    return this.http.get(
      this.apiUrl + 'ReportGeneration/generate/' + guid,
      { headers: this.headers, responseType: 'blob'}
      );
  }
}
