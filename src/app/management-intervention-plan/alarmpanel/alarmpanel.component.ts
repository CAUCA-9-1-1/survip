import {Component, OnInit} from '@angular/core';

import {DevextremeDatagrid} from 'cause-lib';
import {AlarmPanel} from '../shared/models/alarm-panel.model';
import {AlarmPanelService} from '../shared/services/alarm-panel.service';

@Component({
  selector: 'app-management-intervention-plan-alarmpanel',
  templateUrl: './alarmpanel.component.html',
  styleUrls: ['./alarmpanel.component.styl'],
  providers: [
    AlarmPanelService,
  ]
})
export class AlarmPanelComponent extends DevextremeDatagrid implements OnInit {
  alarmPanels: AlarmPanel[] = [];

  constructor(
    private alarmPanelService: AlarmPanelService
  ) {
    super();
  }

  ngOnInit() {
    this.loadAlarmPanel();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.alarmPanelService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadAlarmPanel();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idAlarmPanel = e.key.idAlarmPanel;

    this.alarmPanelService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.alarmPanelService.remove(e.key.idAlarmPanel).subscribe();
  }

  private loadAlarmPanel() {
    this.alarmPanelService.getAll().subscribe(data => this.alarmPanels = data);
  }
}
