import {Component, OnInit} from '@angular/core';

import {DevextremeDatagrid} from 'cause-lib';
import {Region} from '../shared/models/region.model';
import {RegionService} from '../shared/services/region.service';
import {State} from '../shared/models/state.model';
import {StateService} from '../shared/services/state.service';

@Component({
  selector: 'app-managementaddress-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.styl'],
  providers: [
    RegionService,
    StateService,
  ]
})
export class RegionComponent extends DevextremeDatagrid implements OnInit {
  regions: Region[] = [];
  states: State[] = [];

  constructor(private regionService: RegionService, private stateService: StateService) {
    super();
  }

  public ngOnInit() {
    this.loadRegion();
    this.loadState();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.regionService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadRegion();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idRegion = e.key.idRegion;

    this.regionService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.regionService.remove(e.key.idRegion).subscribe();
  }

  private loadRegion() {
    this.regionService.getAll().subscribe(data => this.regions = data);
  }

  private loadState() {
    this.stateService.getAll().subscribe(data => this.states = data);
  }
}
