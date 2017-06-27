import { Component, OnInit } from '@angular/core';
import {
  DevextremeDatagrid
} from 'cause-lib';

import {UnitOfMeasure} from '../shared/models/unit-of-measure.model';
import {UnitOfMeasureService} from '../shared/services/unit-of-measure.service';

@Component({
  selector: 'app-managementfirehydrant-unitofmeasure',
  templateUrl: './unit-of-measure.component.html',
  styleUrls: ['./unit-of-measure.component.styl'],
  providers: [UnitOfMeasureService]
})
export class UnitOfMeasureComponent extends DevextremeDatagrid implements OnInit {
  unitOfMeasures: UnitOfMeasure[] = [];

  constructor(private unitOfMeasureService: UnitOfMeasureService) {
    super();
  }

  ngOnInit() {
    this.loadUnitOfMeasure();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.unitOfMeasureService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadUnitOfMeasure();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idUnitOfMeasure = e.key.idUnitOfMeasure;

    this.unitOfMeasureService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.unitOfMeasureService.remove(e.key.idUnitOfMeasure).subscribe();
  }

  private loadUnitOfMeasure() {
    this.unitOfMeasureService.getAll().subscribe(data => this.unitOfMeasures = data);
  }
}
