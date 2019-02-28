import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Region} from '../shared/models/region.model';
import {RegionService} from '../shared/services/region.service';
import {StateService} from '../shared/services/state.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-address-region',
    templateUrl: './region.component.html',
    styleUrls: ['./region.component.scss'],
    providers: [
        RegionService,
        StateService,
    ]
})
export class RegionComponent extends GridWithCrudService implements OnInit {
    states: any = {};
    public readOnlyImported = !this.stateService.readOnlyImported;
    private labels: any = {};

    constructor(
        regionService: RegionService,
        private stateService: StateService,
        protected translateService: TranslateService
        ) {
        super(translateService, regionService);
    }

    setModel(data: any) {
        return Region.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadState();
    }

    getRegionName(data) {
        const region = Region.fromJSON(data);

        return region.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadState() {
        this.stateService.localized().subscribe(data => {
            this.states = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }
    
    public onEditorPreparing(e: any): void {
        if(e.row != null && e.row.data != null) {
            if(e.row.data.idExtern != null) {
                e.editorOptions.readOnly = e.row.data.idExtern.toString() != null;
                this.readOnly = e.editorOptions.readOnly;
            } else {
                this.readOnly = false;
            }
        }
    }
}
