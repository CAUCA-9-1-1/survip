import {BaseModel} from '../../../shared/models/base.model';


export class InspectionBatch extends BaseModel {
    description: string;
    idWebuserCreatedBy: string;
    isReadyForInspection: boolean;
    shouldStartOn: Date;
    inspections: any[];
    users: any[];

    static fromJSON(data: object): InspectionBatch {
        const batch = new InspectionBatch();

        return Object.assign(batch, data);
    }
}
