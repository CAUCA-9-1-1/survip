import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import config from '../../../assets/config/config.json';
import packageInfo from '../../../assets/config/package.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {CountyService} from '../../management-address/shared/services/county.service';


@Component({
    selector: 'app-management-system-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss'],
    providers: [
        FireSafetyDepartmentService,
        CountyService,
    ]
})
export class DepartmentComponent extends GridWithCrudService implements OnInit {
    counties: any = {store: []};
    languages = [];
    public readOnlyImported = !this.countyService.readOnlyImported;
    private labels: any = {};

    constructor(
        fireSafetyDepartmentService: FireSafetyDepartmentService,
        private countyService: CountyService,
        private translateService: TranslateService
    ) {
        super(fireSafetyDepartmentService);

        this.translateService.get([
            'cannotModifyExternalData'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    setModel(data: any) {
        return FireSafetyDepartment.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadCounty();
        this.loadTranslation();
    }

    getDepartmentName(data) {
        const department = FireSafetyDepartment.fromJSON(data);

        return department.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadCounty() {
        this.countyService.localized().subscribe(data => this.counties = {
          store: data,
          select: ['id', 'name'],
          sort: ['name'],
        });
    }

    private loadTranslation() {
        this.translateService.get(packageInfo.locale).subscribe(data => {
            for (const key in data) {
                if (data[key]) {
                    this.languages.push({
                        code: key,
                        name: data[key],
                    });
                }
            }
        });
    }

    public onEditorPreparing(e: any): void {
        if(e.row != null && e.row.data != null) {
            if(e.row.data.idExtern != null) {
                e.editorOptions.disabled = e.row.data.idExtern.toString() != null;
                this.readOnly = e.editorOptions.disabled;
                this.setPopupName(e, this.labels['cannotModifyExternalData']);
            } else {
                this.readOnly = false;
            }
        }
    }
}
