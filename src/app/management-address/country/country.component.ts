import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Country} from '../shared/models/country.model';
import {CountryService} from '../shared/services/country.service';


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

    setModel(data: any) {
        return Country.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getCountryName(data) {
        const country = Country.fromJSON(data);

        return country.getLocalization(config.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
