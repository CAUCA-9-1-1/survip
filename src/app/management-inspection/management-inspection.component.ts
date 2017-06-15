import {Component, OnInit, ViewChild} from '@angular/core';

import {StatisticsComponent} from './statistics/statistics.component';

@Component({
  selector: 'app-management-inspection',
  templateUrl: './management-inspection.component.html',
  styleUrls: ['./management-inspection.component.styl']
})
export class ManagementInspectionComponent implements OnInit {
  @ViewChild(StatisticsComponent) stats: StatisticsComponent;

  constructor() { }

  ngOnInit() {
  }

  onSelectionChanged(e) {
    if (e.index === 1 && typeof (this.stats) === 'object') {
      if (typeof (this.stats.onShowing) === 'function') {
        this.stats.onShowing();
      }
    }
  }
}
