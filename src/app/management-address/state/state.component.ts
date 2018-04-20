import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

import { State } from '../shared/models/state.model';
import { StateService } from '../shared/services/state.service';
import { Country } from '../shared/models/country.model';
import { CountryService } from '../shared/services/country.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


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
    countries: Country[] = [];

    constructor(
        stateService: StateService,
        private countryService: CountryService
    ) {
        super(stateService);
    }

    ngOnInit() {
        this.loadSource();
        this.loadCountry();
    }

    getStateName(data) {
        const state = State.fromJSON(data);

        return state.getLocalization(environment.locale.use);
    }

    getCountryName(data) {
        const country = Country.fromJSON(data);

        return country.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadCountry() {
        this.countryService.getAll().subscribe(data => this.countries = data);
    }
}
