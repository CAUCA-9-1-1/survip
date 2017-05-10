import {Building} from './building';

export class InterventionPlanBuilding {
  idInterventionPlanBuilding: string;
  idInterventionPlan: string;
  idBuilding: string;
  buildingPlanNumber: string;
  additionalInformation: string;
  height: number;
  idUnitOfMeasureHeight: string;
  estimatedWaterFlow: number;
  idUnitOfMeasureEwf: string;
  createdOn: Date;
  isActive: boolean;
  sprinkler_type: string;
  sprinkler_floor: string;
  sprinkler_wall: string;
  sprinkler_sector: string;
  id_construction_type: string;
  id_construction_type_for_joist: string;
  pipeline_location: string;
  alarm_panel_type: string;
  alarm_panel_floor: string;
  alarm_panel_wall: string;
  alarm_panel_sector: string;

  building: Building;
}
