import {Injectable, Injector} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {RequestService} from '../../../shared/services/request.service';
import {ConfigurationTemplate} from '../models/configuration-template.model';
import {templateCSSPreprocessor} from '../models/template-preprocessor';


@Injectable()
export class ReportConfigurationService extends RequestService {

  constructor(private http: HttpClient, injector: Injector) {
    super(injector);
  }

  getTemplateList() {
    return this.http.get<ConfigurationTemplate[]>(this.apiUrl + 'ReportConfiguration/List/', {
      headers: this.headers
    }).catch((error: HttpErrorResponse) => this.error(error));
  }

  getTemplate(id: string) {
    return this.http.get<ConfigurationTemplate[]>(this.apiUrl + 'ReportConfiguration/Template/' + id, {
      headers: this.headers
    }).catch((error: HttpErrorResponse) => this.error(error));
  }

  saveTemplate(template: string, id: string) {
    return this.http.post<ConfigurationTemplate[]>(this.apiUrl + 'ReportConfiguration/Template/' + id,
      JSON.stringify(
        templateCSSPreprocessor + template
      ),
      {
      headers: this.headers,
    }).catch((error: HttpErrorResponse) => this.error(error));
  }
}
