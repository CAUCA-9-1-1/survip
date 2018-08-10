import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {RequestService} from './request.service';
import {ConfigurationTemplate} from '../models/configuration-template.model';

@Injectable()
export class ReportTemplateService extends RequestService {

  constructor(http: HttpClient, injector: Injector) {
    super(injector);
  }

  getTemplateList() {
    return this.http.get<ConfigurationTemplate[]>(this.apiUrl + 'ReportConfigurationTemplate', {
      headers: this.headers
    });
  }
}
