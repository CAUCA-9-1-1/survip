import {InterventionPlanFireHydrant} from './intervention-plan-fire-hydrant';
import {InterventionPlanCourse} from './intervention-plan-course';
import {InterventionPlanBuildingForDisplay} from './intervention-plan-building-for-display';

export class InterventionPlan {
  id: string;
  planNumber: string;
  planName: string;
  idLaneTransversal: string;
  idPictureSitePlan: string;
  otherInformation: string;
  createdOn: Date;
  revisedOn: Date;
  approvedOn: Date;
  isActive: boolean;

  fireHydrants: InterventionPlanFireHydrant[];
  courses: InterventionPlanCourse[];
  buildings: InterventionPlanBuildingForDisplay[];
}
