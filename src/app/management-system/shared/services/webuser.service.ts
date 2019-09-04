import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Webuser} from '../models/webuser.model';
import {RequestService} from '../../../shared/services/request.service';
import {WebuserForWeb} from '../models/webuser-for-web.model';
import {UserModel} from '@cause-911/management';


@Injectable()
export class WebuserService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<Webuser[]> {
        return this.get('UserManagement/GetAllUsersWithInfo');
    }

    getActive(): Observable<WebuserForWeb[]> {
        return this.get('Webuser/Active/Departments');
    }

    getActiveForPermissions(): Observable<WebuserForWeb[]> {
      return this.get('Webuser/Active');
    }

    save(webuser: Webuser) {
        return this.post('Webuser', webuser);
    }

    remove(idWebuser: string) {
        return this.delete('Webuser/' + idWebuser);
    }
}
