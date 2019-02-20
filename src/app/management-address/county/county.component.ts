import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {County} from '../shared/models/county.model';
import {CountyService} from '../shared/services/county.service';
import {StateService} from '../shared/services/state.service';
import {RegionService} from '../shared/services/region.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-address-county',
    templateUrl: './county.component.html',
    styleUrls: ['./county.component.scss'],
    providers: [
        CountyService,
        StateService,
        RegionService,
    ]
    })
export class CountyComponent extends GridWithCrudService implements OnInit {
    regions: any = {};
    public readOnlyImported = !this.stateService.readOnlyImported;
    private labels: any = {};

    constructor(
        countyService: CountyService,
        private stateService: StateService,
        private regionService: RegionService,
        private translateService: TranslateService
    ) {
        super(countyService);

        this.translateService.get([
            'cannotModifyExternalData'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    setModel(data: any) {
        return County.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadRegion();
    }

    getCountyName(data) {
        const county = County.fromJSON(data);

        return county.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadRegion() {
        this.regionService.localized().subscribe(data => {
            this.regions = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
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
