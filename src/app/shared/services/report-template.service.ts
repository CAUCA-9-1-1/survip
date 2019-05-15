import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {RequestService} from './request.service';
import {ConfigurationTemplate} from '../models/configuration-template.model';
import {templateCSSPreprocessor} from '../../report-configuration/shared/models/template-preprocessor';
import {Observable} from 'rxjs';
import {PostModel} from '../models/post.model';
import {PlaceholderGroup} from '../../report-configuration/shared/models/placeholder-group';


@Injectable()
export class ReportTemplateService extends RequestService {

  constructor(http: HttpClient, injector: Injector) {
    super(injector);
  }

  getPlaceholderList() {
    return this.http.get<PlaceholderGroup[]>(this.apiUrl + 'ReportConfigurationTemplate/placeholders', {
      headers: this.headers
    });
  }

  getTemplateList() {
    return this.http.get<ConfigurationTemplate[]>(this.apiUrl + 'ReportConfigurationTemplate/list', {
      headers: this.headers
    });
  }

  getTemplate(id: string) {
    return this.http.get<ConfigurationTemplate>(this.apiUrl + 'ReportConfigurationTemplate/' + id, {
      headers: this.headers
    });
  }

  saveTemplate(template: ConfigurationTemplate): Observable<PostModel> {
    if (template.data.indexOf('/* Minimal styling to center the editor in this sample */') === -1) {
      template.data = templateCSSPreprocessor + template.data;
    }
    return this.http.post<PostModel>(this.apiUrl + 'ReportConfigurationTemplate/',
      JSON.stringify(template),
      {
        headers: this.headers,
    });
  }

  copyTemplate(id: string) {
    return this.http.post<PostModel>(this.apiUrl + 'ReportConfigurationTemplate/CopyReportConfiguration/',
      JSON.stringify(id),
      {
        headers: this.headers,
    });
  }
}
