import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Observable = ol.Observable;

import { Feature, FeatureFormat, FeatureType } from 'igo2';

import { InspectionService } from '../../shared/services/inspection.service';

@Injectable()
export class InterventionService {

  public features$ = new BehaviorSubject<Feature[]>([]);

  constructor(private inspectionService: InspectionService) {
    this.getFeatures();
  }

  getFeatures() {
    this.inspectionService.getAll().subscribe(inspections => {
      const features = [];

      for (const inspect of inspections) {
        features.push(this.inspectionToMaps(inspect.id, inspect.name.fr, {
          idRiskLevel: inspect.idRiskLevel,
          idSurvey: inspect.idSurvey,
          idInterventionPlan: inspect.idInterventionPlan,
        }, inspect.geojson.coordinates));
      }

      this.setFeatures(features);
    });
  }

  private inspectionToMaps(id, title, property, coordinates): Feature {
    return {
      id: id,
      title: title,
      source: 'inspection',
      type: FeatureType.Feature,
      format: FeatureFormat.GeoJSON,
      projection: 'EPSG:4326',
      geometry: {
        type: 'Point' as ol.geom.GeometryType,
        coordinates: coordinates as [number, number]
      },
      properties: property
    };
  }

  setFeatures(features: Feature[]) {
    this.features$.next(features);
  }

  clear() {
    this.features$.next([]);
  }

}
