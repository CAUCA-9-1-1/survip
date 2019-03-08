import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {RequestService} from '../../../shared/services/request.service';
import {EnumModel} from '../models/enum.model';


@Injectable()
export class LocationTypeService extends RequestService {
    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<EnumModel[]> {
        return this.translateService.get([
            'address', 'laneAndTransversal', 'text', 'NotSpecified'
        ]).pipe(
            map(labels => {
                return [
                    EnumModel.fromJSON({
                        value: 0,
                        name: 'NotSpecified',
                        text: labels['NotSpecified'],
                    }),
                    EnumModel.fromJSON({
                        value: 1,
                        name: 'Address',
                        text: labels['address'],
                    }),
                    EnumModel.fromJSON({
                        value: 2,
                        name: 'LaneAndTransversal',
                        text: labels['laneAndTransversal'],
                    }),
                    EnumModel.fromJSON({
                        value: 3,
                        name: 'Text',
                        text: labels['text'],
                    }),
                ];
            })
        );
    }
}
