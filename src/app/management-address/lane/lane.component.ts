import {Component, OnInit} from '@angular/core';

import {Lane} from '../shared/models/lane.model';
import {LaneService} from '../shared/services/lane.service';
import {City} from '../shared/models/city.model';
import {CityService} from '../shared/services/city.service';

@Component({
  selector: 'app-managementaddress-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss'],
  providers: [
    LaneService,
    CityService,
  ]
})
export class LaneComponent implements OnInit {
  lanes: Lane[] = [];
  cities: City[] = [];

  constructor(private laneService: LaneService, private cityService: CityService) { }

  public ngOnInit() {
    this.loadLane();
    this.loadCity();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.laneService.create(e.data).subscribe(info => {
      if (info['success']) {
        this.loadLane();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idLane = e.key.idLane;

    this.laneService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.laneService.remove(e.key.idLane).subscribe();
  }

  private loadLane() {
    this.laneService.getAll().subscribe(data => this.lanes = data);
  }

  private loadCity() {
    this.cityService.getAll().subscribe(data => this.cities = data);
  }
}
