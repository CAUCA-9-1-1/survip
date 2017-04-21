import { Component, OnInit } from '@angular/core';
import { IgoMap, LayerService, WMSLayerOptions, XYZLayerOptions } from 'igo2';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.styl']
})
export class MapsComponent implements OnInit {

  public map = new IgoMap();
  public mapView = {
    projection: 'EPSG:3857',
    center: [-70.685006, 46.116211],
    zoom: 14
  };

  public menuItems = [
    {
      name: 'batiments',
      title: 'Bâtiments',
      tooltip: 'Bâtiments'
    },
    {
      name: 'eau',
      title: 'Alimentation en eau',
      tooltip: 'Alimentation en eau'
    },
    {
      name: 'implantation',
      title: 'Implantation',
      tooltip: 'Implantation'
    },
    {
      name: 'matieres',
      title: 'Matières dangereuses',
      tooltip: 'Matières dangereuses'
    },
    {
      name: 'pnap',
      title: 'PNAP',
      tooltip: 'PNAP'
    },
    {
      name: 'risques',
      title: 'Risques particuliers',
      tooltip: 'Risques particuliers'
    },
    {
      name: 'incendie',
      title: 'Protection incendie',
      tooltip: 'Protection incendie'
    },
    {
      name: 'contacts',
      title: 'Personnes contact',
      tooltip: 'Personnes contact'
    }
  ];

  constructor(public layerService: LayerService) {}

  ngOnInit() {
    this.layerService.createAsyncLayer({
      title: 'MSP Base Map',
      type: 'xyz',
      source: {
        url: 'https://geoegl.msp.gouv.qc.ca/cgi-wms/mapcache.fcgi/tms/1.0.0/carte_gouv_qc_ro@EPSG_3857/{z}/{x}/{-y}.png'
      }
    } as XYZLayerOptions).subscribe(layer => this.map.addLayer(layer));

    this.layerService.createAsyncLayer({
      title: 'Cauca Town',
      type: 'wms',
      source: {
        url: 'https://mapgearsdev.cauca.ca/app/map/44/0361fdc9-255c-49c0-b76b-92e98d74b788.map',
        params: {
          layers: 'layer431,layer432',
          version: '1.3.0'
        },
        projection: 'EPSG:3857'
      }
    } as WMSLayerOptions).subscribe(layer => this.map.addLayer(layer));
  }

}
