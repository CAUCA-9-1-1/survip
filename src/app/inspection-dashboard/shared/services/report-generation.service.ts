import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class ReportGenerationService extends RequestService {

  constructor(http: HttpClient, injector: Injector) {
    super(injector);
  }

  generateReport(buildingId: string, templateId: string) {
    return this.http.get(
      this.apiUrl + 'ReportGeneration/building/' + buildingId + '/template/' + templateId,
      { headers: this.headers, responseType: 'blob'}
      );
  }
}
