import { Component, OnInit } from '@angular/core';

import {
  DevextremeDatagrid
} from 'cause-lib';

import {FireHydrant} from '../shared/models/fire-hydrant.model';
import {FireHydrantService} from '../shared/services/fire-hydrant.service';
import {FireHydrantType} from '../shared/models/fire-hydrant-type.model';
import {FireHydrantTypeService} from '../shared/services/fire-hydrant-type.service';
import {Lane} from '../../management-address/shared/models/lane.model';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {OperatorType} from '../shared/models/operator-type.model';
import {OperatorTypeService} from '../shared/services/operator-type.service';
import {UnitOfMeasure} from '../shared/models/unit-of-measure.model';
import {UnitOfMeasureService} from '../shared/services/unit-of-measure.service';

@Component({
  selector: 'app-managementfirehydrant-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [
    FireHydrantService,
    FireHydrantTypeService,
    OperatorTypeService,
    UnitOfMeasureService,
    LaneService,
  ]
})
export class ListComponent extends DevextremeDatagrid implements OnInit {
  fireHydrants: FireHydrant[] = [];
  fireHydrantTypes: FireHydrantType[] = [];
  lanes: Lane[] = [];
  operatorTypes: OperatorType[] = [];
  unitOfMeasures: UnitOfMeasure[] = [];

  constructor(
    private fireHydrantService: FireHydrantService,
    private fireHydrantTypeService: FireHydrantTypeService,
    private operatorTypeService: OperatorTypeService,
    private unitOfMeasureService: UnitOfMeasureService,
    private laneService: LaneService,
  ) {
    super();
  }

  ngOnInit() {
    this.loadFireHydrant();
    this.loadFireHydrantType();
    this.loadOperatorType();
    this.loadUnitOfMeasure();
    this.loadLane();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.fireHydrantService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadFireHydrant();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idFireHydrant = e.key.idFireHydrant;

    this.fireHydrantService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.fireHydrantService.remove(e.key.idFireHydrant).subscribe();
  }

  private loadFireHydrant() {
    this.fireHydrantService.getAll().subscribe(data => this.fireHydrants = data);
  }

  private loadFireHydrantType() {
    this.fireHydrantTypeService.getAll().subscribe(data => this.fireHydrantTypes = data);
  }

  private loadOperatorType() {
    this.operatorTypeService.getAll().subscribe(data => this.operatorTypes = data);
  }

  private loadUnitOfMeasure() {
    this.unitOfMeasureService.getAll().subscribe(data => this.unitOfMeasures = data);
  }

  private loadLane() {
    this.laneService.getAll().subscribe(data => this.lanes = data);
  }
}
