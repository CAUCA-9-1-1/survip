import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ConfigurationTemplate} from '../../shared/models/configuration-template.model';
import {ReportTemplateService} from '../../shared/services/report-template.service';

@Component({
  selector: 'app-template-selection',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.css'],
  providers: [/* ReportTemplateService */]
})
export class SelectTemplateComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  dataSource: any = {};
  labels = {};
  templateIdentifiers: ConfigurationTemplate[];
  isOpenDisabled: boolean;
  angularIsLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private translateService: TranslateService,
    private reportConfigurationService: ReportTemplateService
  ) {
    this.templateIdentifiers = [];
    this.reportConfigurationService.getTemplateList().subscribe(data => {
      data.forEach((templateIdentifier) => {
        this.templateIdentifiers.push(templateIdentifier);
      });
    });
    this.dataSource = this.templateIdentifiers;
    this.editReport = this.editReport.bind(this);
  }

  ngOnInit() {
    this.form = this.formBuilder.group([]);
    this.isOpenDisabled = true;

    this.translateService.get([
      'edit'
  ]).subscribe(labels => {
      this.labels = labels;
      this.checkLoadedElement();
  });
  }

  ngAfterViewInit() {

  }

  private checkLoadedElement(): boolean {
    if (this.angularIsLoaded && this.labels !== {}) {
        return true;
    }
    return false;
}

  openExistingTemplate(template: ConfigurationTemplate) {
    //this.dialogRef.close(template);
  }

  textAreaEmpty(name: string) {
    this.isOpenDisabled = name.trim().length === 0;
  }

  create(name: string) {
    const template = new ConfigurationTemplate();
    template.name = name;
    template.data = '';
    //this.dialogRef.close(template);
  }


}
