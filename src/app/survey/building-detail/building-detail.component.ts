import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.styl']
})
export class BuildingDetailComponent implements OnInit {
  @Input() building: any;
  test = 'allo';
  constructor() { }

  ngOnInit() {
  }

}
