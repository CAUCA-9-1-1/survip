import { Component, OnInit } from '@angular/core';
import {
  DevextremeDatagrid
} from 'cause-lib';

import {FireHydrantType} from '../shared/models/fire-hydrant-type.model';
import {FireHydrantTypeService} from '../shared/services/fire-hydrant-type.service';

@Component({
  selector: 'app-managementfirehydrant-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.styl'],
  providers: [FireHydrantTypeService]
})
export class TypeComponent extends DevextremeDatagrid implements OnInit {
  fireHydrantTypes: FireHydrantType[] = [];

  constructor(private fireHydrantTypeService: FireHydrantTypeService) {
    super();
  }

  ngOnInit() {
    this.loadFireHydrantType();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.fireHydrantTypeService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadFireHydrantType();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idFireHydrantType = e.key.idFireHydrantType;

    this.fireHydrantTypeService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.fireHydrantTypeService.remove(e.key.idFireHydrantType).subscribe();
  }

  private loadFireHydrantType() {
    this.fireHydrantTypeService.getAll().subscribe(data => this.fireHydrantTypes = data);
  }
}
