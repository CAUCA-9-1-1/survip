import {Component, OnInit} from '@angular/core';
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
    public selectedTemplate: ConfigurationTemplate;
    public placeholders: PlaceholderGroup[];
    public data = '';

    constructor(
        private activeRoute: ActivatedRoute,
        private translateService: TranslateService,
        private reportConfigurationService: ReportTemplateService) {
    }

    public ngOnInit() {
        this.selectedTemplate = new ConfigurationTemplate();

        this.reportConfigurationService.getPlaceholderList().subscribe(res => {
            this.placeholders = res;
          this.activeRoute.params.subscribe(param => {
            this.loadTemplate(param.idReport);
          });
        });
    }

    public loadTemplate(id): void {
        this.reportConfigurationService.getTemplate(id).subscribe(res => {
            this.selectedTemplate = res;
            this.data = res.data;
        });
    }

    public saveTemplate(e): void {
        this.selectedTemplate.data = e;
        this.reportConfigurationService.saveTemplate(this.selectedTemplate).subscribe(res => {
            if (this.selectedTemplate.id == null) {
                this.selectedTemplate.id = res.id;
            }
        });
    }
}
