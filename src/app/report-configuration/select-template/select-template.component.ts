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
  editedTemplate: ConfigurationTemplate;

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

  onInitNewRow(e) {
    e.data = new ConfigurationTemplate();
    e.data.data = '';
    e.data.isActive = true;
  }

  onRowInserting(e){
    this.saveTemplate(e.data);
  }

  onEditingStart(e){
    this.editedTemplate = new ConfigurationTemplate();
    this.editedTemplate.id = e.data.id;
    this.editedTemplate.isActive = e.data.isActive;
    this.reportConfigurationService.getTemplate(e.data.id).subscribe( res => {
      this.editedTemplate.data = res.data;
    });
  }

  onRowUpdated(e){
    this.editedTemplate.name = e.data.name;
    e.data = this.editedTemplate;
    this.saveTemplate(e.data);
  }

  onRowRemoved(e){
    let selectedTemplate = e.data;
    selectedTemplate.isActive = false;
    this.saveTemplate(selectedTemplate);
  }

  editReport(report){
    this.router.navigate(['/report-edition', report.id]);
  }

  saveTemplate(selectedTemplate: ConfigurationTemplate): void {
    this.reportConfigurationService.saveTemplate(selectedTemplate).subscribe(res => {
      if (!selectedTemplate.id) {
        selectedTemplate.id = res.id;
      }
    });
  }
}
