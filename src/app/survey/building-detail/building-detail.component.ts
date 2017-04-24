import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-survey-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.styl']
})
export class BuildingDetailComponent implements OnInit {
  @Input() building: any;
  selectedDieMeasuring: string = '1';
  imageSrc= 'protocol.png';
  constructor() { }

  ngOnInit() {
  }

}
