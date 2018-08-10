import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {ReportTemplateService} from '../shared/services/report-template.service';
import {ConfigurationTemplate} from '../shared/models/configuration-template.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-report-configuration',
  templateUrl: './report-configuration.component.html',
  styleUrls: ['./report-configuration.component.scss'],
  providers: [ReportTemplateService]
})
export class ReportConfigurationComponent implements OnInit {
  templateData: string;
  selectedTemplateId: string;
  templateIdentifiers: ConfigurationTemplate[];

  constructor(
    private translateService: TranslateService,
    private reportConfigurationService: ReportTemplateService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.templateIdentifiers = [];
    this.fetchTemplateIdentifiers();
  }

  fetchTemplateIdentifiers(): void {
    this.reportConfigurationService.getTemplateList().subscribe(data => {
      data.forEach((templateIdentifier) => {
        this.templateIdentifiers.push(templateIdentifier);
      });
    });
  }

  fetchTemplateData(): void {
        this.reportConfigurationService.getTemplate(this.selectedTemplateId).subscribe( res => {
          this.templateData = res.data;
          this.changeDetectorRef.detectChanges();
        });
        return;
  }

  saveTemplate(): void {
    this.templateIdentifiers.forEach((template) => {
      if (template.id === this.selectedTemplateId) {
        template.data = this.templateData;
        this.reportConfigurationService.saveTemplate(template).subscribe();
        return;
      }
    });
  }
}
