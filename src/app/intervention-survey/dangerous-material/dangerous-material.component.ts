import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BuildingHazardousMaterial} from '../shared/models/building-hazardous-material';

@Component({
  selector: 'app-intervention-survey-dangerous-material',
  templateUrl: './dangerous-material.component.html',
  styleUrls: ['./dangerous-material.component.styl']
})
export class DangerousMaterialComponent implements OnInit, OnChanges {

  @Input() item: BuildingHazardousMaterial;
  @Output() deleteClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log('changed');
  }

}
