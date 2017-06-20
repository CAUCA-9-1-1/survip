import {Component, OnInit} from '@angular/core';

import {DevextremeDatagrid} from 'cause-lib';
import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';

@Component({
  selector: 'app-management-address-citytype',
  templateUrl: './citytype.component.html',
  styleUrls: ['./citytype.component.styl'],
  providers: [CityTypeService]
})
export class CityTypeComponent extends DevextremeDatagrid implements OnInit {
  cityType: CityType[] = [];

  constructor(private cityTypeService: CityTypeService) {
    super();
  }

  public ngOnInit() {
    this.loadCityType();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.cityTypeService.create(e.data).subscribe(info => {
      if (info.success) {
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
