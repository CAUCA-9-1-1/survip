import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from 'environments/environment';
import {DxDataGridComponent} from 'devextreme-angular';
import {LanguageService} from 'igo2';

import {DataGrid} from '../../core/devextreme/datagrid';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {County} from '../../management-address/shared/models/county.model';
import {CountyService} from '../../management-address/shared/services/county.service';

@Component({
  selector: 'app-management-access-firesafetydepartment',
  templateUrl: './firesafetydepartment.component.html',
  styleUrls: ['./firesafetydepartment.component.styl'],
  providers: [
    FireSafetyDepartmentService,
    CountyService,
  ]
})
export class FireSafetyDepartmentComponent extends DataGrid implements OnInit {
  @ViewChild(DxDataGridComponent) deptGrid: DxDataGridComponent;

  departments: FireSafetyDepartment[] = [];
  counties: County[] = [];
  selectedName: object = {};
  languages: object[] = [];

  constructor(
    private fireSafetyDepartmentService: FireSafetyDepartmentService,
    private countyService: CountyService,
    private translate: LanguageService
  ) {
    super();
  }

  public ngOnInit() {
    this.loadDeparment();
    this.loadCounty();
    this.translate.translate.get(environment.languages).subscribe((labels) => {
      environment.languages.forEach((lang) => {
        this.languages.push({
          code: lang,
          name: labels[lang],
        });
      });
    });
  }

  public onNameChanged(e) {
    this.selectedName = e.value;
    this.deptGrid.instance.cellValue(0, 'name', e.value);
  }

  public onEditingStart(e) {
    this.selectedName = e.data.name;
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.fireSafetyDepartmentService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadDeparment();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idFireSafetyDepartment = e.key.idFireSafetyDepartment;

    this.fireSafetyDepartmentService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.fireSafetyDepartmentService.remove(e.key.idFireSafetyDepartment).subscribe();
  }

  private loadDeparment() {
    this.fireSafetyDepartmentService.getAll().subscribe(infoDept => {
      this.departments = infoDept.data;
    });
  }

  private loadCounty() {
    this.countyService.getAll().subscribe(infoCounty => {
      this.counties = infoCounty.data;
    });
  }
}
