import {Component, Input, OnInit} from '@angular/core';
import {InterventionPlanBuildingForDisplay} from '../shared/models/intervention-plan-building-for-display';
import {Router} from '@angular/router';

@Component({
  selector: 'app-intervention-survey-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.styl']
})
export class BuildingDetailComponent implements OnInit {
  @Input() building: InterventionPlanBuildingForDisplay;

  constructor(private router?: Router) { }

  ngOnInit() {
  }

  onEditClicked() {
    this.router.navigate(['/intervention/building', this.building.id]);
  }
}
