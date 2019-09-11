import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Webuser} from '../models/webuser.model';
import {RequestService} from '../../../shared/services/request.service';
import {WebuserForWeb} from '../models/webuser-for-web.model';
import {UserModel} from '@cause-911/management';
import {map} from 'rxjs/operators';


@Injectable()
export class WebuserService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<Webuser[]> {
        return this.get('UserManagement/GetAllUsersWithInfo').pipe(
          map( items => {
            items.forEach(item => {
              item.password = '';
            });
            return items;
          })
        );
    }

    getActive(): Observable<WebuserForWeb[]> {
        return this.get('User/Active/Departments');
    }

    save(webuser: UserModel): Observable<any> {
        return this.post('UserManagement/SaveUserWithFireSafetyDepartments', webuser);
    }

    remove(idWebuser: string) {
        return this.delete('Webuser/' + idWebuser);
    }
}
