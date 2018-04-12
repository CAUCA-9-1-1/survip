import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from 'environments/environment';
import {DxDataGridComponent} from 'devextreme-angular';

import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {County} from '../../management-address/shared/models/county.model';
import {CountyService} from '../../management-address/shared/services/county.service';


@Component({
  selector: 'app-management-access-firesafetydepartment',
  templateUrl: './firesafetydepartment.component.html',
  styleUrls: ['./firesafetydepartment.component.scss'],
  providers: [
    FireSafetyDepartmentService,
    CountyService,
  ]
})
export class FireSafetyDepartmentComponent implements OnInit {
  @ViewChild(DxDataGridComponent) deptGrid: DxDataGridComponent;

  departments: FireSafetyDepartment[] = [];
  counties: County[] = [];
  languages: object[] = [];

  constructor(
    private fireSafetyDepartmentService: FireSafetyDepartmentService,
    private countyService: CountyService,
    private translate: TranslateService
  ) { }

  public ngOnInit() {
    this.loadDeparment();
    this.loadCounty();
    this.translate.get(['fr', 'en']/*environment.cause.languages*/).subscribe((labels) => {
      // environment.cause.languages
      ['fr', 'en'].forEach((lang) => {
        this.languages.push({
          code: lang,
          name: labels[lang],
        });
      });
    });
  }

  public onNameChanged(row, e) {
    row.setValue(e.value);
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    /*this.fireSafetyDepartmentService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadDeparment();
      }
    });*/
  }

  public onRowUpdated(e) {
    e.data.idFireSafetyDepartment = e.key.idFireSafetyDepartment;

    // this.fireSafetyDepartmentService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
      // this.fireSafetyDepartmentService.remove(e.key.idFireSafetyDepartment).subscribe();
  }

  private loadDeparment() {
    // this.fireSafetyDepartmentService.getAll().subscribe(data => this.departments = data);
  }

  private loadCounty() {
    // this.countyService.getAll().subscribe(data => this.counties = data);
  }
}
