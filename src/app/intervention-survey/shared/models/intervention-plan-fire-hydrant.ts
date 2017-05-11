/*  We'll use this one in the real version.

 export class InterventionPlanFireHydrant {
 id_intervention_plan_fire_hydrant: string;
 id_intervention_plan: string;
 id_fire_hydrant: string;
 created_on: Date;
 is_active: boolean;
 }*/

export class InterventionPlanFireHydrant {
  id: string;
  idInterventionPlan: string;
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
