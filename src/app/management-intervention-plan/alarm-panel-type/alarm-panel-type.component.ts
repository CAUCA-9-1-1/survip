import {Component, OnInit} from '@angular/core';

import {AlarmPanelType} from '../shared/models/alarm-panel-type.model';
import {AlarmPanelTypeService} from '../shared/services/alarm-panel-type.service';

@Component({
  selector: 'app-managementinterventionplan-alarmpaneltype',
  templateUrl: './alarm-panel-type.component.html',
  styleUrls: ['./alarm-panel-type.component.styl'],
  providers: [
    AlarmPanelTypeService,
  ]
})
export class AlarmPanelTypeComponent implements OnInit {
  alarmPanels: AlarmPanelType[] = [];

  constructor(
    private alarmPanelTypeService: AlarmPanelTypeService
  ) { }

  ngOnInit() {
    this.loadAlarmPanel();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    /*this.alarmPanelTypeService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadAlarmPanel();
      }
    });*/
  }

  public onRowUpdated(e) {
    e.data.idAlarmPanel = e.key.idAlarmPanel;

    // this.alarmPanelTypeService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    // this.alarmPanelTypeService.remove(e.key.idAlarmPanel).subscribe();
  }

  private loadAlarmPanel() {
    // this.alarmPanelTypeService.getAll().subscribe(data => this.alarmPanels = data);
  }
}
