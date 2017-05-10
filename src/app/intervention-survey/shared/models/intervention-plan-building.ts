import {Building} from './building';

export class InterventionPlanBuilding {
  id: string;
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
  sprinklerLocation: string;
  sprinklerType: string;
  sprinklerFloor: string;
  sprinklerWall: string;
  sprinklerSector: string;
  idConstructionType: string;
  idConstructionTypeForJoist: string;
  pipelineLocation: string;
  alarmPanelType: string;
  alarmPanelFloor: string;
  alarmPanelWall: string;
  alarmPanelSector: string;

  building: Building;
}
