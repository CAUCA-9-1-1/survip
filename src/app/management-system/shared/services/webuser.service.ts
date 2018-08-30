import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Webuser} from '../models/webuser.model';
import {RequestService} from '../../../shared/services/request.service';
import {WebuserForWeb} from '../models/webuser-for-web.model';


@Injectable()
export class WebuserService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<Webuser[]> {
        return this.get('Webuser');
    }

    getActive(): Observable<WebuserForWeb[]> {
        return this.get('Webuser/Active');
    }

    save(webuser: Webuser) {
        return this.post('Webuser', webuser);
    }

    remove(idWebuser: string) {
        return this.delete('Webuser/' + idWebuser);
    }
}
