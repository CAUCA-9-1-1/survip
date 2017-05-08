export class InterventionPlanFireHydrant {
  id: string;
  number: string;
  color: string;
  idFireHydrantType: string;
  capacity: number;
  idUnitOfMeasure: string;
  addressType: number; // 1: address, 2: intersection, 3: lat/long, 4: other.
  idLocationType: string;
  civicNumber: string;
  idLane: string;
  idLaneIntersection: string;
  latitude: number;
  longitude: number;
  locationDetails: string;
  isActive: boolean;
}
