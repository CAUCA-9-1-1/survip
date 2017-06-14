import {Component, OnInit} from '@angular/core';

import {DataGrid} from '../../core/devextreme/datagrid';
import {State} from '../shared/models/state.model';
import {StateService} from '../shared/services/state.service';
import {Country} from '../shared/models/country.model';
import {CountryService} from '../shared/services/country.service';

@Component({
  selector: 'app-management-address-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.styl'],
  providers: [
    StateService,
    CountryService,
  ]
})
export class StateComponent extends DataGrid implements OnInit {
  states: State[] = [];
  countries: Country[] = [];

  constructor(private stateService: StateService, private countryService: CountryService) {
    super();
  }

  public ngOnInit() {
    this.loadState();
    this.loadCountry();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.stateService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadState();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idState = e.key.idState;

    this.stateService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.stateService.remove(e.key.idState).subscribe();
  }

  private loadState() {
    this.stateService.getAll().subscribe(data => this.states = data);
  }

  private loadCountry() {
    this.countryService.getAll().subscribe(data => this.countries = data);
  }
}
