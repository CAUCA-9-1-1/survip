import {Component, OnInit} from '@angular/core';

import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';

@Component({
  selector: 'app-managementaddress-citytype',
  templateUrl: './city-type.component.html',
  styleUrls: ['./city-type.component.scss'],
  providers: [CityTypeService]
})
export class CityTypeComponent implements OnInit {
  cityType: CityType[] = [];

  constructor(private cityTypeService: CityTypeService) { }

  public ngOnInit() {
    this.loadCityType();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.cityTypeService.create(e.data).subscribe(info => {
      if (info['success']) {
        this.loadCityType();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idCityType = e.key.idCityType;

    this.cityTypeService.update(e.key).subscribe();
  }

  public onRowRemoved(e) {
    this.cityTypeService.remove(e.key.idCityType).subscribe();
  }

  private loadCityType() {
    this.cityTypeService.getAll().subscribe(data => this.cityType = data);
  }
}
