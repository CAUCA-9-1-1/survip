import {Component, OnInit} from '@angular/core';

import {DataGrid} from '../../core/devextreme/datagrid';
import {County} from '../shared/models/county.model';
import {CountyService} from '../shared/services/county.service';
import {State} from '../shared/models/state.model';
import {StateService} from '../shared/services/state.service';
import {Region} from '../shared/models/region.model';
import {RegionService} from '../shared/services/region.service';

@Component({
  selector: 'app-management-address-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.styl'],
  providers: [
    CountyService,
    StateService,
    RegionService,
  ]
})
export class CountyComponent extends DataGrid implements OnInit {
  counties: County[] = [];
  states: State[] = [];
  regions: Region[] = [];

  constructor(
    private countyService: CountyService,
    private stateService: StateService,
    private regionService: RegionService
  ) {
    super();
  }

  public ngOnInit() {
    this.loadCounty();
    this.loadState();
    this.loadRegion();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.countyService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadCounty();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idCounty = e.key.idCounty;

    this.countyService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.countyService.remove(e.key.idCounty).subscribe();
  }

  private loadCounty() {
    this.countyService.getAll().subscribe(infoCounty => {
      this.counties = infoCounty.data;
    });
  }

  private loadState() {
    this.stateService.getAll().subscribe(infoState => {
      this.states = infoState.data;
    });
  }

  private loadRegion() {
    this.regionService.getAll().subscribe(infoRegion => {
      this.regions = infoRegion.data;
    });
  }
}
