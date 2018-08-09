import {Injectable, Injector} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {RequestService} from '../../../shared/services/request.service';
import {ConfigurationTemplate} from '../models/configuration-template.model';
import {templateCSSPreprocessor} from '../models/template-preprocessor';


@Injectable()
export class ReportConfigurationService extends RequestService {

  constructor(http: HttpClient, injector: Injector) {
    super(injector);
  }

  getTemplateList() {
    return this.http.get<ConfigurationTemplate[]>(this.apiUrl + 'ReportConfigurationTemplate/', {
      headers: this.headers
    });
  }

  getTemplate(id: string) {
    return this.http.get<ConfigurationTemplate>(this.apiUrl + 'ReportConfigurationTemplate/' + id, {
      headers: this.headers
    });
  }

  saveTemplate(template: ConfigurationTemplate) {
    template.data = templateCSSPreprocessor + template.data
    return this.http.post(this.apiUrl + 'ReportConfigurationTemplate/',
      JSON.stringify(template),
      {
      headers: this.headers,
    });
  }
}
