import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

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

    getFoundation(id: string): Observable<ParticularRiskFoundation> {
        return this.get('inspection/building/' + id + '/particularrisk/foundation');
    }

    getRoof(id: string): Observable<ParticularRiskRoof> {
        return this.get('inspection/building/' + id + '/particularrisk/roof');
    }

    getWall(id: string): Observable<ParticularRiskWall> {
        return this.get('inspection/building/' + id + '/particularrisk/wall');
    }

    getPictures(id: string): Observable<Picture[]> {
        return this.get('inspection/building/particularrisk/' + id + '/picture');
    }
}
