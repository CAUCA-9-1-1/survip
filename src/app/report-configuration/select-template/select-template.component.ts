import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ConfigurationTemplate} from '../../shared/models/configuration-template.model';
import {ReportTemplateService} from '../../shared/services/report-template.service';

@Component({
  selector: 'app-template-selection',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.css']
})
export class SelectTemplateComponent implements OnInit {

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

    this.translateService.get(['edit']).subscribe(labels => {
      this.labels = labels;
      this.checkLoadedElement();
    });
  }

  private checkLoadedElement(): boolean {
    if (this.angularIsLoaded && this.labels !== {}) {
      return true;
    }
    return false;
}

  textAreaEmpty(name: string) {
    this.isOpenDisabled = name.trim().length === 0;
  }


  onRowInserted(e){
    const template = new ConfigurationTemplate();
    template.name = e.data.name;
    template.data = '';
    this.saveTemplate(template);
  }

  onRowUpdated(e){
    this.saveTemplate(e.data);
  }

  onRowRemoved(e){
    let selectedTemplate = e.data;
    selectedTemplate.isActive = false;
    this.saveTemplate(selectedTemplate);
  }

  editReport(report){
    this.router.navigate(['/report-edition', report.id.toString()]);
  }

  saveTemplate(selectedTemplate: ConfigurationTemplate): void {
    this.reportConfigurationService.saveTemplate(selectedTemplate).subscribe(res => {
      if (selectedTemplate.id == null) {
        selectedTemplate.id = res.id;
      }
    });
  }
}
