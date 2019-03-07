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

    constructor(
        fireSafetyDepartmentService: FireSafetyDepartmentService,
        private countyService: CountyService,
        protected translateService: TranslateService
    ) {
        super(translateService, fireSafetyDepartmentService);
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
}
