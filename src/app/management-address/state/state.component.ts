import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {State} from '../shared/models/state.model';
import {StateService} from '../shared/services/state.service';
import {CountryService} from '../shared/services/country.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-address-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.scss'],
    providers: [
        StateService,
        CountryService,
    ]
})
export class StateComponent extends GridWithCrudService implements OnInit {
    countries: any = {};
    public readOnlyImported = !this.countryService.readOnlyImported;
    private labels: any = {};

    constructor(
        stateService: StateService,
        private countryService: CountryService,
        private translateService: TranslateService
    ) {
        super(stateService);
        
        this.translateService.get([
            'cannotModifyExternalData'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    setModel(data: any) {
        return State.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadCountry();
    }

    getStateName(data) {
        const state = State.fromJSON(data);

        return state.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadCountry() {
        this.countryService.localized().subscribe(data => {
            this.countries = {
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
