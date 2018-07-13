import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReportConfigurationService} from './shared/services/report-configuration.service';
import {ConfigurationTemplate} from './shared/models/configuration-template.model';

@Component({
  selector: 'app-report-configuration',
  templateUrl: './report-configuration.component.html',
  styleUrls: ['./report-configuration.component.scss'],
  providers: [ReportConfigurationService]
})
export class ReportConfigurationComponent implements OnInit {
  // TODO replace constant with a list of available templates.
  readonly TEMPLATE_NAME = 'Rapport Cauca';
  documentContent: string;
  selectedTemplateId: string;
  templates: ConfigurationTemplate[];

  constructor(
    private reportConfigurationService: ReportConfigurationService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.templates = [];
    this.fetchTemplates();
  }

  fetchTemplates(): void {
    this.reportConfigurationService.getTemplateList().subscribe(data => {
      data.forEach((template) => {
        this.templates.push(template);
      });
    });
  }

  fetchTemplate(): void {
    this.templates.forEach((template) => {
      if (template.name === this.TEMPLATE_NAME) {
        this.selectedTemplateId = template.id;
        this.reportConfigurationService.getTemplate(this.selectedTemplateId).subscribe( res => {
          template.data = res.data;
          this.documentContent = res.data;
          this.changeDetectorRef.detectChanges();
        });
        return;
      }
    });
  }

  saveTemplate(): void {
    this.templates.forEach((template) => {
      if (template.id === this.selectedTemplateId) {
        template.data = this.documentContent;
        this.reportConfigurationService.saveTemplate(template).subscribe();
        return;
      }
    });
  }
}
