import { Directive, Self, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  private riskCode = {};

  private textStyleOptions = {
    text: 'home',
    font: 'normal 22px Material Icons',
    textBaseline: 'Center'
  };

  get map(): IgoMap {
    return this.component.map;
  }

  constructor(@Self() component?: MapBrowserComponent,
              private router?: Router,
              private interventionService?: InterventionService,
              private riskLevelService?: RiskLevelService) {
    if (component) {
      this.component = component;

      this.riskLevelService.getAll().subscribe(levels => {
        levels.forEach(level => {
          this.fillColors[level.idRiskLevel] = level.color;
          this.riskCode[level.idRiskLevel] = level.code;
        });

        this.addLayer();
      });
    }
  }

  ngOnInit() { }

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

    this.component.map.olMap.getViewport().addEventListener('click', (e) => {
      const eventPixel = this.component.map.olMap.getEventPixel(e);

      this.component.map.olMap.forEachFeatureAtPixel(eventPixel, (feature, layer) => {
        this.click(feature);
      });
    });
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
    const cls = feature.properties.idRiskLevel || '-1';
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

  private click(feature) {
    if (feature) {
      const properties = feature.getProperties();

      if (this.riskCode[properties.idRiskLevel] === 3 || this.riskCode[properties.idRiskLevel] === 4) {
        this.router.navigate(['/intervention/survey', properties.idInterventionPlan]);
      } else {
        this.router.navigate(['/prevention/survey', properties.idSurvey]);
      }
    }
  }
}
