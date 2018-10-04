import {Injectable, Injector} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {EnumModel} from '../../../management-type-system/shared/models/enum.model';
import {map} from 'rxjs/operators';


@Injectable()
export class InspectionStatusService extends RequestService {

    public constructor(injector: Injector) {
        super(injector);

        this.translateService = injector.get(TranslateService);
    }

    public getAll(): Observable<EnumModel[]> {
        return this.translateService.get([
            'todo', 'started', 'waitingForApprobation', 'approved', 'refused', 'canceled',
        ]).pipe(
            map(labels => {
                return [
                    EnumModel.fromJSON({
                        value: 0,
                        name: 'Todo',
                        text: labels['todo']
                    }),
                    EnumModel.fromJSON({
                        value: 1,
                        name: 'Started',
                        text: labels['started']
                    }),
                    EnumModel.fromJSON({
                        value: 2,
                        name: 'WaitingForApprobation',
                        text: labels['waitingForApprobation']
                    }),
                    EnumModel.fromJSON({
                        value: 3,
                        name: 'Approved',
                        text: labels['approved']
                    }),
                    EnumModel.fromJSON({
                        value: 4,
                        name: 'Refused',
                        text: labels['refused']
                    }),
                    EnumModel.fromJSON({
                        value: 5,
                        name: 'Canceled',
                        text: labels['canceled']
                    })
                ];
            })
        );
    }
}
