import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {Sprinkler} from '../models/sprinkler.model';
import {AlarmPanel} from '../models/alarm-panel.model';


@Injectable({
    providedIn: 'root'
})
export class InspectionBuildingFireProtectionService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getSprinkler(id: string): Observable<AlarmPanel> {
        return this.get('inspection/building/' + id + '/sprinklerlist');
    }

    saveSprinkler(sprinkler: Sprinkler) {
        return this.post('inspection/building/sprinkler', sprinkler);
    }

    removeSprinkler(id: string) {
        return this.delete('inspection/building/sprinkler/' + id);
    }

    getAlarmPanel(id: string): Observable<AlarmPanel> {
        return this.get('inspection/building/' + id + '/alarmpanellist');
    }

    saveAlarmPanel(alarmPanel: AlarmPanel) {
        return this.post('inspection/building/alarmpanel', alarmPanel);
    }

    removeAlarmPanel(id: string) {
        return this.delete('inspection/building/alarmpanel/' + id);
    }
}
