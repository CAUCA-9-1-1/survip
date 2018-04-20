import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

import { Country } from '../shared/models/country.model';
import { CountryService } from '../shared/services/country.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
  selector: 'app-managementaddress-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  providers: [CountryService]
})
export class CountryComponent extends GridWithCrudService implements OnInit {

    constructor(countryService: CountryService) {
        super(countryService);
    }

    ngOnInit() {
        this.loadSource();
    }

    getCountryName(data) {
        const country = Country.fromJSON(data);

        return country.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
