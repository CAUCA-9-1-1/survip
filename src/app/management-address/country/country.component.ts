import {Component, OnInit} from '@angular/core';

import {DevextremeDatagrid} from 'cause-lib';
import {Country} from '../shared/models/country.model';
import {CountryService} from '../shared/services/country.service';

@Component({
  selector: 'app-managementaddress-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.styl'],
  providers: [CountryService]
})
export class CountryComponent extends DevextremeDatagrid implements OnInit {
  countries: Country[] = [];

  constructor(private countryService: CountryService) {
    super();
  }

  public ngOnInit() {
    this.loadCountry();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.countryService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadCountry();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idCountry = e.key.idCountry;

    this.countryService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.countryService.remove(e.key.idCountry).subscribe();
  }

  private loadCountry() {
    this.countryService.getAll().subscribe(data => this.countries = data);
  }
}
