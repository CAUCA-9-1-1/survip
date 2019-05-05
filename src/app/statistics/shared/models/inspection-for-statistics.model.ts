import { BaseModel } from '../../../shared/models/base.model';

export class InspectionForStatistics extends BaseModel {
    public id: string;
    public status: number;
    public riskLevel: number;
    public idFireSafetyDepartment: string;
    public completedOn: Date;
    public hasBeenRefused: boolean;
    public ownerWasAbsent: boolean;
    public doorHangerHasBeenLeft: boolean;

    static fromJSON(data: object): InspectionForStatistics {
        const inspection = new InspectionForStatistics();

        return Object.assign(inspection, data);
    }
}
