import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import Guid from 'devextreme/core/guid';
import { TranslateService } from '@ngx-translate/core';
import { ObjectivesService } from '../shared/services/objectives.service';
import { CityService } from '../../management-address/shared/services/city.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Objective } from '../../statistics/shared/models/objective.model';
import { GridWithCrudService } from '../../shared/classes/grid-with-crud-service';
import { FireSafetyDepartmentRiskLevelService } from '../shared/services/fire-safety-department-risk-level.service';
import { FireSafetyDepartmentService } from '../../management-system/shared/services/firesafetydepartment.service';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-manage-objectives',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
  providers: [ObjectivesService, CityService, FireSafetyDepartmentService]
})
export class ObjectiveComponent extends GridWithCrudService implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  isLoading = false;

  private formFieldCity: any = null;
  private labels: any = {};
  private selectedCity = '';

  // @Input() idFireSafetyDepartment = null;

  lowRisk: Objective[] = [];
  highRisk = [{ year: 2016, objective: 10 }, { year: 2017, objective: 10 }, { year: 2018, objective: 5 }, { year: 2019, objective: 7 }];

  constructor(
    private dialog: MatDialog,
    public translateService: TranslateService,
    private objectiveService: ObjectivesService,
    // private cityService: CityService,
    private fireSafetyDepartmentService: FireSafetyDepartmentService,
  ) {
    super(null, objectiveService);

    this.translateService.get([
      'selectFireSafetyDepartment', 'add'
    ]).subscribe(labels => {
      this.labels = labels;
    });
  }

  public ngOnInit() {
    this.loadFireSafetyDepartment();
    this.loadObjectives();
  }

  setModel(data: any) {
    return Objective.fromJSON(data);
  }


  public onToolbarPreparing(e) {
    const toolbarItems = e.toolbarOptions.items;

    toolbarItems.unshift({
      widget: 'dxLookup',
      options: {
        displayExpr: 'name',
        valueExpr: 'id',
        width: 300,
        placeholder: this.labels['selectFireSafetyDepartment'],
        title: this.labels['selectFireSafetyDepartment'],
        closeOnOutsideClick: true,
        onInitialized: (ev) => {
          this.formFieldCity = ev.component;
        },
        onValueChanged: (ev) => {
          this.selectedCity = ev.value;
          this.lowRisk.filter((el) => {
            return el.idFireSafetyDepartment === ev.idFireSafetyDepartment;
          });
          // this.lowRisk.load();
        }
      }
    });
  }

  onInitNewRow(e) {
    e.data.isActive = true;
    // e.data.idFireSafetyDepartment = this.idFireSafetyDepartment.id;
  }

  public onRowInserted(e) {
    this.objectiveService.save(e.data);
  }

  public onRowUpdated(e) {
    this.objectiveService.save(e.data);
  }

  public onRowRemoved(e) {
    this.objectiveService.remove(e.data.id);
  }

  private loadObjectives() {
    /*  this.objectiveService.getLocalized(this.idFireSafetyDepartment.id).subscribe(result => {
       this.lowRisk = result;
     }); */
  }

  private loadFireSafetyDepartment() {
    this.fireSafetyDepartmentService.localized().subscribe(data => {
      this.formFieldCity.option('value', (data[0] ? data[0].id : ''));
      this.formFieldCity.option('dataSource', {
        store: data,
        select: ['id', 'name'],
        sort: ['name'],
      });
    });
  }
}
