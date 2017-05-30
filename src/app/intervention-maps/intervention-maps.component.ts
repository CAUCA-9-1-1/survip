import {Component, OnInit} from '@angular/core';

import {
  IgoMap,
  ContextService,
  DetailedContext
} from 'igo2';

@Component({
  selector: 'app-maps',
  templateUrl: './intervention-maps.component.html',
  styleUrls: ['./intervention-maps.component.styl']
})
export class InterventionMapsComponent implements OnInit {

  public map = new IgoMap();

  constructor(private contextService: ContextService) {}

  ngOnInit() {
    const layer1 = {
      'source': {
        'title': 'Fond de carte du Québec',
        'type': 'xyz',
        'url': 'https://geoegl.msp.gouv.qc.ca/cgi-wms/mapcache.fcgi/tms/1.0.0/carte_gouv_qc_ro@EPSG_3857/{z}/{x}/{-y}.png'
      }
    };

    const layer2 = {
      'source': {
        'title': 'Cauca Town',
        'type': 'wms',
        'url': 'https://mapgearsdev.cauca.ca/app/map/44/0361fdc9-255c-49c0-b76b-92e98d74b788.map',
        'params': {
          'layers': 'layer431',
          'version': '1.3.0'
        }
      }
    };

    this.contextService.setContext({
      'uri': 'default',
      'title': 'Default Context',
      'map': {
        'view': {
          'projection': 'EPSG:3857',
          'center': [-70.685006, 46.116211],
          'zoom': 14,
          'minZoom': 6,
          'maxZoom': 17
        }
      },
      'layers': [layer1]
    } as DetailedContext);
  }
}