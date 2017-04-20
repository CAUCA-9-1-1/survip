import { Component, OnInit } from '@angular/core';

import { IgoMap, LayerService, XYZLayerOptions } from 'igo2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  public map = new IgoMap();
  public mapView = {
    projection: 'EPSG:3857',
    center: [-70.545006, 46.056211],
    zoom: 15
  };

  constructor(public layerService: LayerService) {}

  ngOnInit() {
    this.layerService.createAsyncLayer({
      title: 'MSP Base Map',
      type: 'xyz',
      source: {
        url: 'https://geoegl.msp.gouv.qc.ca/cgi-wms/mapcache.fcgi/tms/1.0.0/carte_gouv_qc_ro@EPSG_3857/{z}/{x}/{-y}.png'
      }
    } as XYZLayerOptions).subscribe(layer => this.map.addLayer(layer));

  }

}
