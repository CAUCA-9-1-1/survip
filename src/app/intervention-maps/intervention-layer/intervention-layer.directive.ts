import { Directive, Self, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Feature, MapBrowserComponent, IgoMap, VectorLayer } from 'igo2';

import { InterventionService } from '../shared/intervention.service';
import { RiskLevelService } from '../../shared/services/risk-level.service';


@Directive({
  selector: '[appInterventionLayer]'
})
export class InterventionLayerDirective implements OnInit, OnDestroy {

  private component: MapBrowserComponent;
  private interventionSource: ol.source.Vector;
  private features$$: Subscription;
  private format = new ol.format.GeoJSON();

  private fillColors = {};

  private textStyleOptions = {
    text: 'home',
    font: 'normal 22px Material Icons',
    textBaseline: 'Center'
  };

  get map(): IgoMap {
    return this.component.map;
  }

  constructor(@Self() component: MapBrowserComponent,
              private interventionService: InterventionService,
              private riskLevel: RiskLevelService) {
    this.component = component;

    this.riskLevel.getAll().subscribe(levels => {
      levels.forEach(level => {
        this.fillColors[level.code] = level.color;
      });

      this.addLayer();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.features$$.unsubscribe();
  }

  private addLayer() {
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
    const cls = feature.properties.class || '-1';
    const fillColor = this.fillColors[cls] || this.fillColors['-1'];

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
