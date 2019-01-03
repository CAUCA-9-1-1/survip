import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ConfigurationTemplate} from '../../shared/models/configuration-template.model';
import {ReportTemplateService} from '../../shared/services/report-template.service';
import {confirm} from 'devextreme/ui/dialog';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-template-selection',
    templateUrl: './select-template.component.html',
    styleUrls: ['./select-template.component.css']
})
export class SelectTemplateComponent extends GridWithCrudService  implements OnInit {

    public form: FormGroup;
    public dataSource: any = {};
    public labels = {};
    public templateIdentifiers: ConfigurationTemplate[];
    public isOpenDisabled: boolean;
    public angularIsLoaded = false;
    public editedTemplate: ConfigurationTemplate;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private translateService: TranslateService,
        private reportConfigurationService: ReportTemplateService
    ) {
        super(reportConfigurationService);
        this.templateIdentifiers = [];
        this.reportConfigurationService.getTemplateList().subscribe(data => {
            data.forEach((templateIdentifier) => {
                this.templateIdentifiers.push(templateIdentifier);
            });
        });
        this.dataSource = this.templateIdentifiers;
        this.editReport = this.editReport.bind(this);
    }

    public ngOnInit() {
        this.form = this.formBuilder.group([]);
        this.isOpenDisabled = true;

        this.translateService.get(['edit', 'reportTemplateCopyQuestion', 'question']).subscribe(labels => {
            this.labels = labels;
            this.checkLoadedElement();
        });
    }

    setModel(data: any) {
        return ConfigurationTemplate.fromJSON(data);
    }

    private checkLoadedElement(): boolean {
        return this.angularIsLoaded && this.labels !== {};
    }

    public onInitNewRow(e) {
        e.data = new ConfigurationTemplate();
        e.data.data = '';
        e.data.isActive = true;
    }

    public onRowInserting(e) {
        this.saveTemplate(e.data);
    }

    public onEditingStart(e) {
        this.editedTemplate = new ConfigurationTemplate();
        this.editedTemplate.id = e.data.id;
        this.editedTemplate.isActive = e.data.isActive;
        this.reportConfigurationService.getTemplate(e.data.id).subscribe(res => {
            this.editedTemplate.data = res.data;
        });
    }

    public onRowUpdated(e) {
        this.editedTemplate.name = e.data.name;
        e.data = this.editedTemplate;
        this.saveTemplate(e.data);
    }

    public onRowRemoved(e) {
        const selectedTemplate = e.data;
        selectedTemplate.isActive = false;
        this.saveTemplate(selectedTemplate);
    }

    public editReport(report) {
        this.router.navigate(['/report-edition', report.id]);
    }

    public saveTemplate(selectedTemplate: ConfigurationTemplate) {
        this.reportConfigurationService.saveTemplate(selectedTemplate).subscribe(res => {
            if (!selectedTemplate.id) {
                selectedTemplate.id = res.id;
            }
        });
    }

    public onCopyReport(e) {
        confirm(this.labels['reportTemplateCopyQuestion'], this.labels['question']).then((result) => {
            if (result) {
                this.reportConfigurationService.copyTemplate(e.id).subscribe(res => {
                    if(res.id) {
                        this.templateIdentifiers.push(JSON.parse(JSON.stringify(res)));
                    }
                });
            }
        });

    }
}
