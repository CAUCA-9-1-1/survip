import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReportTemplateService} from '../shared/services/report-template.service';
import {TranslateService} from '@ngx-translate/core';
import {ConfigurationTemplate} from '../shared/models/configuration-template.model';
import {PlaceholderGroup} from './shared/models/placeholder-group';


@Component({
  selector: 'app-report-configuration',
  templateUrl: './report-configuration.component.html',
  styleUrls: ['./report-configuration.component.scss'],
  providers: []
})
export class ReportConfigurationComponent implements OnInit {
  selectedTemplate: ConfigurationTemplate;
  templateIdentifiers: ConfigurationTemplate[];
  placeholders: PlaceholderGroup[];

  constructor(
    private activeRoute: ActivatedRoute,
    private translateService: TranslateService,
    private reportConfigurationService: ReportTemplateService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {   
   }

  ngOnInit() {
    this.reportConfigurationService.getPlaceholderList().subscribe(res => {
      this.placeholders = res;
    });
    this.templateIdentifiers = [];
    this.fetchRequiredData();

    this.selectedTemplate = new ConfigurationTemplate();
  }

  fetchRequiredData(): void {
    this.reportConfigurationService.getTemplateList().subscribe(data => {
      data.forEach((templateIdentifier) => {
        this.templateIdentifiers.push(templateIdentifier);
      });

      this.activeRoute.params.subscribe(param => {
        this.reportConfigurationService.getTemplate(param.idReport).subscribe(data => {
            this.selectedTemplate = data;
            this.fetchTemplateData();
        });
      });
    });
  }

  fetchTemplateData(): void {
    this.reportConfigurationService.getTemplate(this.selectedTemplate.id).subscribe( res => {
      this.selectedTemplate.data = res.data;
      this.changeDetectorRef.detectChanges();
    });
    return;
  }

  saveTemplate(): void {
    this.reportConfigurationService.saveTemplate(this.selectedTemplate).subscribe(res => {
      if (this.selectedTemplate.id == null) {
        this.selectedTemplate.id = res.id;
      }
    });
  }

  loadTemplate(): void {
    this.fetchTemplateData();
  }

  selectOrCreateTemplate(template: ConfigurationTemplate) {
    if (template == null) {
      return;
    } else {
      if (template.id != null) {
        this.selectedTemplate = template;
        this.fetchTemplateData();
      } else {
        this.templateIdentifiers.push(template);
        this.selectedTemplate = template;
        this.saveTemplate();
      }
    }
  }
}
