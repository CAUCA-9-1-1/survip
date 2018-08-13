///<reference path="../shared/models/configuration-template.model.ts"/>
import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';

import {ReportTemplateService} from '../shared/services/report-template.service';
import {TranslateService} from '@ngx-translate/core';
import {ConfigurationTemplate} from '../shared/models/configuration-template.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CreateTemplateComponent} from './create-template/create-template.component';

@Component({
  selector: 'app-report-configuration',
  templateUrl: './report-configuration.component.html',
  styleUrls: ['./report-configuration.component.scss'],
  providers: [ReportTemplateService]
})
export class ReportConfigurationComponent implements OnInit {
  selectedTemplate: ConfigurationTemplate;
  templateIdentifiers: ConfigurationTemplate[];

  constructor(
    private dialog: MatDialog,
    private translateService: TranslateService,
    private reportConfigurationService: ReportTemplateService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.templateIdentifiers = [];
    this.fetchTemplateIdentifiers();
    this.selectedTemplate = new ConfigurationTemplate();
    }

  fetchTemplateIdentifiers(): void {
    this.reportConfigurationService.getTemplateList().subscribe(data => {
      data.forEach((templateIdentifier) => {
        this.templateIdentifiers.push(templateIdentifier);
      });
      this.openDialog();
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
      this.reportConfigurationService.saveTemplate(this.selectedTemplate).subscribe();
  }

  openDialog() {
    // Needs tp be run inside the NgZone because the function is sometims called as an emit from CKEditor
    this.ngZone.run(() => {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        id: 1,
        templateIdentifiers: this.templateIdentifiers
      };

      const dialogRef = this.dialog.open(CreateTemplateComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result == null) {
          return;
        } else {
          if (result.id != null) {
            this.selectedTemplate = result;
            this.fetchTemplateData();
          }
        }
      });
    });
  }
}
