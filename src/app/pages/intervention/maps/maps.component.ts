import { Component, OnInit } from '@angular/core';

import { IgoMap, ContextService } from 'igo2';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.styl']
})
export class MapsComponent implements OnInit {

  public map = new IgoMap();

  constructor(private contextService: ContextService) {}

  ngOnInit() {
    this.contextService.loadContext('_default');
  }
}
