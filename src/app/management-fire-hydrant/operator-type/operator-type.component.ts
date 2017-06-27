import { Component, OnInit } from '@angular/core';
import {
  DevextremeDatagrid
} from 'cause-lib';

import {OperatorType} from '../shared/models/operator-type.model';
import {OperatorTypeService} from '../shared/services/operator-type.service';

@Component({
  selector: 'app-managementfirehydrant-operatortype',
  templateUrl: './operator-type.component.html',
  styleUrls: ['./operator-type.component.styl'],
  providers: [OperatorTypeService]
})
export class OperatorTypeComponent extends DevextremeDatagrid implements OnInit {
  operatorTypes: OperatorType[] = [];

  constructor(private operatorTypeService: OperatorTypeService) {
    super();
  }

  ngOnInit() {
    this.loadOperatorType();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.operatorTypeService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadOperatorType();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idOperatorType = e.key.idOperatorType;

    this.operatorTypeService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.operatorTypeService.remove(e.key.idOperatorType).subscribe();
  }

  private loadOperatorType() {
    this.operatorTypeService.getAll().subscribe(data => this.operatorTypes = data);
  }
}
