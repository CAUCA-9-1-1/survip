import { Directive, Self, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Feature, MapBrowserComponent, IgoMap, VectorLayer } from 'igo2';

import { InterventionService } from '../shared/intervention.service';


@Directive({
  selector: '[appInterventionLayer]'
})
export class InterventionLayerDirective implements OnInit, OnDestroy {

  private component: MapBrowserComponent;
  private interventionSource: ol.source.Vector;
  private features$$: Subscription;
  private format = new ol.format.GeoJSON();

  private fillColors = {
    '0': '#dddddd',
    '1': '#ff0000',
    '2': '#00ff00',
    '3': '#0000ff'
  };

  private textStyleOptions = {
    text: 'home',
    font: 'normal 18px Material Icons',
    textBaseline: 'Center'
  };

  get map(): IgoMap {
    return this.component.map;
  }

  constructor(@Self() component: MapBrowserComponent,
              private interventionService: InterventionService) {
    this.component = component;
  }

  ngOnInit() {
    const interventionLayer = new VectorLayer({
      title: 'interventions',
      type: 'vector',
      zIndex: 20
    });
    this.map.addLayer(interventionLayer, false);
    this.interventionSource = interventionLayer.olLayer.getSource();

    this.features$$ = this.interventionService.features$
      .subscribe(features => this.handleFeatures(features));
  }

  ngOnDestroy() {
    this.features$$.unsubscribe();
  }

  private handleFeatures(features: Feature[]) {
    this.interventionSource.clear();

    if (!features) { return; }

    features.forEach((feature: Feature) => this.addFeature(feature));
  }

  private addFeature(feature: Feature) {
    const style = this.createFeatureStyle(feature);
    const olFeature = this.format.readFeature(feature, {
      dataProjection: feature.projection,
      featureProjection: this.map.projection
    });

    olFeature.setStyle(style);
    this.interventionSource.addFeature(olFeature);
  }

  private createFeatureStyle(feature: Feature): ol.style.Style {
    const cls = feature.properties.class || '0';
    const fillColor = this.fillColors[cls] || this.fillColors['0'];

    const style = new ol.style.Style({
      text: new ol.style.Text(Object.assign({
        fill: new ol.style.Fill({
          color: fillColor
        })
      }, this.textStyleOptions))
    });

    return style;
  }

}
