import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Feature, FeatureFormat, FeatureType } from 'igo2';


@Injectable()
export class InterventionService {

  public features$ = new BehaviorSubject<Feature[]>([]);

  constructor() {
    const source = 'Intervention';

    const features = [
      {
        id: '1',
        source: source,
        type: FeatureType.Feature, // --> 'Feature'
        format: FeatureFormat.GeoJSON, // --> 'GeoJSON'
        title: 'Inspection 1',
        projection: 'EPSG:4326',
        geometry: {
          type: 'Point' as ol.geom.GeometryType,
          coordinates: [-70.685006, 46.116211] as [number, number]
        },
        properties: {
          name: 'name 1',
          address: 'address 1',
          class: 1
        }
      },
      {
        id: '2',
        source: source,
        type: FeatureType.Feature,
        format: FeatureFormat.GeoJSON,
        title: 'Inspection 2',
        projection: 'EPSG:4326',
        geometry: {
          type: 'Point' as ol.geom.GeometryType,
          coordinates: [-70.695006, 46.136211] as [number, number]
        },
        properties: {
          name: 'name 2',
          address: 'address 2',
          class: 1
        }
      },
      {
        id: '3',
        source: source,
        type: FeatureType.Feature,
        format: FeatureFormat.GeoJSON,
        title: 'Inspection 3',
        projection: 'EPSG:4326',
        geometry: {
          type: 'Point' as ol.geom.GeometryType,
          coordinates: [-70.675006, 46.096211] as [number, number]
        },
        properties: {
          name: 'name 3',
          address: 'address 3',
          class: 2
        }
      },
      {
        id: '4',
        source: source,
        type: FeatureType.Feature,
        format: FeatureFormat.GeoJSON,
        title: 'Inspection 4',
        projection: 'EPSG:4326',
        geometry: {
          type: 'Point' as ol.geom.GeometryType,
          coordinates: [-70.735006, 46.116211] as [number, number]
        },
        properties: {
          name: 'name 4',
          address: 'address 4',
          class: 3
        }
      }
    ];

    this.setFeatures(features);
  }

  setFeatures(features: Feature[]) {
    this.features$.next(features);
  }

  clear() {
    this.features$.next([]);
  }

}
