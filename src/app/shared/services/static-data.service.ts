import {Injectable, Injector} from '@angular/core';
import {RequestService} from './request.service';

@Injectable({
    providedIn: 'root'
})
export class StaticDataService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    public getSprinklerType() {
        return this.get('SprinklerType');
    }

    public getAlarmPanelType() {
        return this.get('AlarmPanelType');
    }

    public getWalls() {
        return ['M1', 'M2', 'M3', 'M4', 'S1', 'S2', 'S3', 'S4', 'S5'];
    }

    public getSectors() {
        return ['A', 'B', 'C', 'D'];
    }
}
