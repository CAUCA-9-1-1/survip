import {Injectable, Injector} from '@angular/core';
import {RequestService} from '../../../shared/services/request.service';
import {Configuration} from '../models/configuration.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable()
export class ConfigurationService extends RequestService {

    get maximumUploadSize(): number {
        return +sessionStorage.getItem('maximumUploadSize');
    };

    public constructor(injector: Injector) {
        super(injector);
    }

    public getConfiguration(): Observable<any> {
        return this.get('GeneralConfiguration/configuration')
            .pipe(map(result => {
                sessionStorage.setItem('maximumUploadSize', result.maximumUploadSize);

                return true;
            }));
    }
}