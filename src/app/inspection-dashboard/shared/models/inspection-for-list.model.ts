import { BaseModel } from '../../../shared/models/base.model';


export class InspectionForList extends BaseModel {
    completeOn: Date;
    idBatch: string;
    idBuilding: string;
    idInterventionForm: string;
    idSurvey: string;
    idWebuserAssignedTo: string;
    idWebuserCreatedBy: string;
    isCompleted: boolean;
    isStarted: boolean;
    startedOn: Date;

    static fromJSON(data: object): InspectionForList {
        const inspection = new InspectionForList();

        return Object.assign(inspection, data);
    }
}
