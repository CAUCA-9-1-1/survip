import { Component, OnInit } from '@angular/core';

import {UnitOfMeasure} from '../shared/models/unit-of-measure.model';
import {UnitOfMeasureService} from '../shared/services/unit-of-measure.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';

@Component({
  selector: 'app-managementfirehydrant-unitofmeasure',
  templateUrl: './unit-of-measure.component.html',
  styleUrls: ['./unit-of-measure.component.scss'],
  providers: [UnitOfMeasureService]
})
export class UnitOfMeasureComponent extends GridWithCrudService implements OnInit {
  unitOfMeasures: UnitOfMeasure[] = [];

  constructor(unitOfMeasureService: UnitOfMeasureService) {
    super(unitOfMeasureService);
  }

  ngOnInit() {
    this.loadSource();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }
}
