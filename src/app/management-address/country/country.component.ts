import { Component } from '@angular/core';

import { Country } from '../shared/models/country.model';
import { CountryService } from '../shared/services/country.service';


@Component({
  selector: 'app-managementaddress-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  providers: [CountryService]
})
export class CountryComponent {
    countries: Country[] = [];

    constructor(private countryService: CountryService) {
        this.loadCountry();
    }

    public getCountryName(data) {
        const country = Country.fromJSON(data);

        return country.getLocalization('fr');
    }

    public onInitNewRow(e) {
        e.data.isActive = true;
    }

    public onRowInserted(e) {
        this.countryService.save(e.data).subscribe(info => {
            this.loadCountry();
        });
    }

    public onRowUpdated(e) {
        this.countryService.save(e.key).subscribe();
    }

    public onRowRemoved(e) {
        this.countryService.remove(e.key.idCountry).subscribe();
    }

    private loadCountry() {
        this.countryService.getAll().subscribe(data => this.countries = data);
    }
}
