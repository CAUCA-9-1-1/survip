import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {State} from '../shared/models/state.model';
import {StateService} from '../shared/services/state.service';
import {CountryService} from '../shared/services/country.service';


@Component({
    selector: 'app-managementaddress-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.scss'],
    providers: [
        StateService,
        CountryService,
    ]
})
export class StateComponent extends GridWithCrudService implements OnInit {
    countries: any = {};

    constructor(
        stateService: StateService,
        private countryService: CountryService
    ) {
        super(stateService);
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
}
