import {Component, Input, OnInit} from '@angular/core';
import {InterventionPlanBuildingForDisplay} from '../shared/models/intervention-plan-building-for-display';
import {Router} from '@angular/router';
import {Picture} from '../../shared/interfaces/picture.interface';
import {PictureService} from '../../shared/services/picture.service';

@Component({
  selector: 'app-intervention-survey-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.styl']
})
export class BuildingDetailComponent implements OnInit {
  @Input() building: InterventionPlanBuildingForDisplay;
  picture: Picture;

  constructor(
    private pictureService: PictureService,
    private router?: Router,
  ) { }

  ngOnInit() {
    if (this.building) {
      this.pictureService.get(this.building.idImage)
        .subscribe(pic => this.picture = pic);
    }
  }

  onEditClicked() {
    this.router.navigate(['/intervention/building', this.building.id]);
  }
}
