import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {UtilisationCode} from '../models/utilisation-code.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class UtilisationCodeService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<UtilisationCode[]> {
        return this.get('UtilisationCode');
    }

    localized(): Observable<UtilisationCode[]> {
        return this.get('UtilisationCode/localized');
    }

    save(code: UtilisationCode) {
        return this.post('UtilisationCode', code);
    }

    remove(idCode: string) {
        return this.delete('UtilisationCode/' + idCode);
    }
}
