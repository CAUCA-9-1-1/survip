import { BaseModel } from '../../../shared/models/base.model';


export class Inspection extends BaseModel {
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

    static fromJSON(data: object): Inspection {
        const inspection = new Inspection();

        return Object.assign(inspection, data);
    }
}
