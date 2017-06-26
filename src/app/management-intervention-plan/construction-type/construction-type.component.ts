import {Component, OnInit} from '@angular/core';

import {DevextremeDatagrid} from 'cause-lib';
import {ConstructionType} from '../shared/models/construction-type.model';
import {ConstructionTypeService} from '../shared/services/construction-type.service';

@Component({
  selector: 'app-managementinterventionplan-constructiontype',
  templateUrl: './construction-type.component.html',
  styleUrls: ['./construction-type.component.styl'],
  providers: [
    ConstructionTypeService,
  ]
})
export class ConstructionTypeComponent extends DevextremeDatagrid implements OnInit {
  constructionTypes: ConstructionType[] = [];

  constructor(
    private constructionTypeService: ConstructionTypeService
  ) {
    super();
  }

  ngOnInit() {
    this.loadConstructionType();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.constructionTypeService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadConstructionType();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idConstructionType = e.key.idConstructionType;

    this.constructionTypeService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.constructionTypeService.remove(e.key.idConstructionType).subscribe();
  }

  private loadConstructionType() {
    this.constructionTypeService.getAll().subscribe(data => this.constructionTypes = data);
  }
}
