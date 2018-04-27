import {Component, OnInit, ViewChild} from '@angular/core';

import {StatisticsComponent} from './statistics/statistics.component';

@Component({
  selector: 'app-management-access',
  templateUrl: './management-access.component.html',
  styleUrls: ['./management-access.component.scss']
})
export class ManagementAccessComponent implements OnInit {
  @ViewChild(StatisticsComponent) stats: StatisticsComponent;

  constructor() { }

  ngOnInit() {
  }

  onSelectionChanged(e) {
    if (e.index === 4 && typeof (this.stats) === 'object') {
      if (typeof (this.stats.onShowing) === 'function') {
        this.stats.onShowing();
      }
    }
  }
}
