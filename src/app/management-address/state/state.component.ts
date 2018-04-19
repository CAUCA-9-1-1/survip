import { Component, OnInit } from '@angular/core';

import { State } from '../shared/models/state.model';
import { StateService } from '../shared/services/state.service';
import { Country } from '../shared/models/country.model';
import { CountryService } from '../shared/services/country.service';


@Component({
    selector: 'app-managementaddress-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.scss'],
    providers: [
        StateService,
        CountryService,
    ]
})
export class StateComponent implements OnInit {
    states: State[] = [];
    countries: Country[] = [];

    constructor(
        private stateService: StateService,
        private countryService: CountryService
    ) { }

    ngOnInit() {
        this.loadState();
        this.loadCountry();
    }

    getStateName(data) {
        const state = State.fromJSON(data);

        return state.getLocalization('fr');
    }

    getCountryName(data) {
        const country = Country.fromJSON(data);

        return country.getLocalization('fr');
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
        this.stateService.save(e.data).subscribe(info => {
            this.loadState();
        });
    }

    onRowUpdated(e) {
        this.stateService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.stateService.remove(e.key.idState).subscribe();
    }

    private loadState() {
        this.stateService.getAll().subscribe(data => this.states = data);
    }

    private loadCountry() {
        this.countryService.getAll().subscribe(data => this.countries = data);
    }
}
