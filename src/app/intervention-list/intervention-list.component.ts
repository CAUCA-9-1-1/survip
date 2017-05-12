import { Component, OnInit } from '@angular/core';
import {InspectionService} from '../shared/services/inspection.service';
import {Inspection} from '../shared/interfaces/inspection.interface';

@Component({
  selector: 'app-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: ['./intervention-list.component.styl']
})
export class InterventionListComponent implements OnInit {

  inspections: Inspection[];

  constructor(private inspectionService: InspectionService) {
    inspectionService.getAll()
      .subscribe(inspections => this.inspections = inspections);
  }

  ngOnInit() {
  }
}
