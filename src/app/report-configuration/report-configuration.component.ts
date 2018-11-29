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
    public selectedTemplate: ConfigurationTemplate;
    public templateIdentifiers: ConfigurationTemplate[];
    public placeholders: PlaceholderGroup[];

    constructor(
        private activeRoute: ActivatedRoute,
        private translateService: TranslateService,
        private reportConfigurationService: ReportTemplateService,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    public ngOnInit() {
        this.reportConfigurationService.getPlaceholderList().subscribe(res => {
            this.placeholders = res;
            console.log('placeHolder : ', this.placeholders);
        });
        this.templateIdentifiers = [];
        this.fetchRequiredData();

        this.selectedTemplate = new ConfigurationTemplate();
    }

    public fetchRequiredData(): void {
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

    public fetchTemplateData(): void {
        this.reportConfigurationService.getTemplate(this.selectedTemplate.id).subscribe(res => {
            this.selectedTemplate.data = res.data;
            this.changeDetectorRef.detectChanges();
        });
        return;
    }

    public saveTemplate(): void {
        this.reportConfigurationService.saveTemplate(this.selectedTemplate).subscribe(res => {
            if (this.selectedTemplate.id == null) {
                this.selectedTemplate.id = res.id;
            }
        });
    }

    public loadTemplate(): void {
        this.fetchTemplateData();
    }
}
