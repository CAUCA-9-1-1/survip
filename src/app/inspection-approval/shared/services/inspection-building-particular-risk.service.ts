import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {ParticularRiskFoundation} from '../models/particular-risk-foundation.model';
import {ParticularRiskFloor} from '../models/particular-risk-floor.model';
import {ParticularRiskRoof} from '../models/particular-risk-roof.model';
import {ParticularRiskWall} from '../models/particular-risk-wall.model';
import {Picture} from '../../../shared/models/picture.model';


@Injectable()
export class InspectionBuildingParticularRiskService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getFloor(id: string): Observable<ParticularRiskFloor> {
        return this.get('inspection/building/' + id + '/particularrisk/floor');
    }

    saveFloor(risk: ParticularRiskFloor) {
        return this.post('inspection/building/particularrisk/floor', risk);
    }

    getFoundation(id: string): Observable<ParticularRiskFoundation> {
        return this.get('inspection/building/' + id + '/particularrisk/foundation');
    }

    saveFoundation(risk: ParticularRiskFoundation) {
        return this.post('inspection/building/particularrisk/foundation', risk);
    }

    getRoof(id: string): Observable<ParticularRiskRoof> {
        return this.get('inspection/building/' + id + '/particularrisk/roof');
    }

    saveRoof(risk: ParticularRiskRoof) {
        return this.post('inspection/building/particularrisk/roof', risk);
    }

    getWall(id: string): Observable<ParticularRiskWall> {
        return this.get('inspection/building/' + id + '/particularrisk/wall');
    }

    saveWall(risk: ParticularRiskWall) {
        return this.post('inspection/building/particularrisk/wall', risk);
    }

    getPictures(id: string): Observable<Picture[]> {
        return this.get('inspection/building/particularrisk/' + id + '/picture');
    }
}
