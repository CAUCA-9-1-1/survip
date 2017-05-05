import { Component, OnInit } from '@angular/core';

import { IgoMap, ContextService } from 'igo2';

@Component({
  selector: 'app-maps',
  templateUrl: './intervention-maps.component.html',
  styleUrls: ['./intervention-maps.component.styl']
})
export class InterventionMapsComponent implements OnInit {

  public map = new IgoMap();

  constructor(private contextService: ContextService) {}

  ngOnInit() {
    this.contextService.loadContext('_default');
  }
}
