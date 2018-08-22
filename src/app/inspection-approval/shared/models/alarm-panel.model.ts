import {BaseModel} from '../../../shared/models/base.model';


export class AlarmPanel extends BaseModel {
    floor: string;
    wall: string;
    sector: string;
    idBuilding: string;
    idAlarmPanelType: string;

    static fromJSON(data: object): AlarmPanel {
        const item = new AlarmPanel();

        return Object.assign(item, data);
    }
}
