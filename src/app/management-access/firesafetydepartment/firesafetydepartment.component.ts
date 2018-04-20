import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

import { FireSafetyDepartment } from '../shared/models/firesafetydepartment.model';
import { FireSafetyDepartmentService } from '../shared/services/firesafetydepartment.service';
import { County } from '../../management-address/shared/models/county.model';
import { CountyService } from '../../management-address/shared/services/county.service';


@Component({
    selector: 'app-management-access-firesafetydepartment',
    templateUrl: './firesafetydepartment.component.html',
    styleUrls: ['./firesafetydepartment.component.scss'],
    providers: [
        FireSafetyDepartmentService,
        CountyService,
    ]
})
export class FireSafetyDepartmentComponent implements OnInit {
    departments: FireSafetyDepartment[] = [];
    counties: County[] = [];
    languages = [];

    constructor(
        private fireSafetyDepartmentService: FireSafetyDepartmentService,
        private countyService: CountyService,
        private translateService: TranslateService
    ) { }

    ngOnInit() {
        this.loadDeparment();
        this.loadCounty();
        this.loadTranslation();
    }

    getDepartmentName(data) {
        const department = FireSafetyDepartment.fromJSON(data);

        return department.getLocalization('fr');
    }

    getCountyName(data) {
        const county = County.fromJSON(data);

        return county.getLocalization('fr');
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    onRowValidating(e) {
        if (!e.newData.localizations) {
            e.isValid = false;
        }
    }

    onRowInserted(e) {
        this.fireSafetyDepartmentService.save(e.data).subscribe(info => {
            this.loadDeparment();
        });
    }

    onRowUpdated(e) {
        this.fireSafetyDepartmentService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.fireSafetyDepartmentService.remove(e.key.id).subscribe();
    }

    private loadDeparment() {
        this.fireSafetyDepartmentService.getAll().subscribe(data => this.departments = data);
    }

    private loadCounty() {
        this.countyService.getAll().subscribe(data => this.counties = data);
    }

    private loadTranslation() {
        this.translateService.get(environment.locale.available).subscribe(data => {
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
