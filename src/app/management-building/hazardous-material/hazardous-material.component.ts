import {Component, OnInit} from '@angular/core';

import {DevextremeDatagrid} from 'cause-lib';
import {HazardousMaterial} from '../shared/models/hazardous-material.model';
import {HazardousMaterialService} from '../shared/services/hazardous-material.service';

@Component({
  selector: 'app-managementbuilding-hazardousmaterial',
  templateUrl: './hazardous-material.component.html',
  styleUrls: ['./hazardous-material.component.styl'],
  providers: [
    HazardousMaterialService,
  ]
})
export class HazardousMaterialComponent extends DevextremeDatagrid implements OnInit {
  hazardousMaterials: HazardousMaterial[] = [];

  constructor(
    private hazardousMaterialService: HazardousMaterialService
  ) {
    super();
  }

  ngOnInit() {
    this.loadHazardousMaterial();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.hazardousMaterialService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadHazardousMaterial();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idHazardousMaterial = e.key.idHazardousMaterial;

    this.hazardousMaterialService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.hazardousMaterialService.remove(e.key.idHazardousMaterial).subscribe();
  }

  private loadHazardousMaterial() {
    this.hazardousMaterialService.getAll().subscribe(data => this.hazardousMaterials = data);
  }
}
