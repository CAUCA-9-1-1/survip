import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import config from '../../../assets/config/config.json';
import packageInfo from '../../../assets/config/package.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {County} from '../../management-address/shared/models/county.model';
import {CountyService} from '../../management-address/shared/services/county.service';


@Component({
    selector: 'app-management-access-firesafetydepartment',
    templateUrl: './firesafetydepartment.component.html',
    styleUrls: ['./firesafetydepartment.component.scss'],
    providers: [
        FireSafetyDepartmentService,
        CountyService,
    ]
})
export class FireSafetyDepartmentComponent extends GridWithCrudService implements OnInit {
    counties: County[] = [];
    languages = [];

    constructor(
        fireSafetyDepartmentService: FireSafetyDepartmentService,
        private countyService: CountyService,
        private translateService: TranslateService
    ) {
        super(fireSafetyDepartmentService);
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

    getCountyName(data) {
        const county = County.fromJSON(data);

        return county.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadCounty() {
        this.countyService.getAll().subscribe(data => this.counties = data);
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
