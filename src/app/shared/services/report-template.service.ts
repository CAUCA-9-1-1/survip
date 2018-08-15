import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {RequestService} from './request.service';
import {ConfigurationTemplate} from '../models/configuration-template.model';
import {templateCSSPreprocessor} from '../../report-configuration/shared/models/template-preprocessor';
import {Observable} from 'rxjs/Observable';
import {PostModel} from '../models/post.model';


@Injectable()
export class ReportTemplateService extends RequestService {

  constructor(http: HttpClient, injector: Injector) {
    super(injector);
  }

  getPlaceholderList() {
    return this.http.get<String[]>(this.apiUrl + 'ReportConfigurationTemplate/placeholders', {
      headers: this.headers
    });
  }

  getTemplateList() {
    return this.http.get<ConfigurationTemplate[]>(this.apiUrl + 'ReportConfigurationTemplate', {
      headers: this.headers
    });
  }

  getTemplate(id: string) {
    return this.http.get<ConfigurationTemplate>(this.apiUrl + 'ReportConfigurationTemplate/' + id, {
      headers: this.headers
    });
  }

  saveTemplate(template: ConfigurationTemplate): Observable<PostModel> {
    template.data = templateCSSPreprocessor + template.data
    return this.http.post<PostModel>(this.apiUrl + 'ReportConfigurationTemplate/',
      JSON.stringify(template),
      {
        headers: this.headers,
    });
  }
}
