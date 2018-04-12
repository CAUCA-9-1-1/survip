import {Component, OnInit} from '@angular/core';

import {City} from '../shared/models/city.model';
import {CityService} from '../shared/services/city.service';
import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';
import {County} from '../shared/models/county.model';
import {CountyService} from '../shared/services/county.service';

@Component({
  selector: 'app-managementaddress-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  providers: [
    CityService,
    CityTypeService,
    CountyService,
  ]
})
export class CityComponent implements OnInit {
  cities: City[] = [];
  citiesType: CityType[] = [];
  counties: County[] = [];

  constructor(
    private cityService: CityService,
    private cityTypeService: CityTypeService,
    private countyService: CountyService
  ) { }

  public ngOnInit() {
    this.loadCity();
    this.loadCityType();
    this.loadCounty();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.cityService.create(e.data).subscribe(info => {
      if (info['success']) {
        this.loadCity();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idCity = e.key.idCity;

    this.cityService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.cityService.remove(e.key.idCity).subscribe();
  }

  private loadCity() {
    this.cityService.getAll().subscribe(data => this.cities = data);
  }

  private loadCityType() {
    this.cityTypeService.getAll().subscribe(data => this.citiesType = data);
  }

  private loadCounty() {
    this.countyService.getAll().subscribe(data => this.counties = data);
  }
}
