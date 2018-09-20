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
            'address', 'laneAndIntersection', 'coordinates', 'text'
        ]).pipe(
            map(labels => {
                return [
                    EnumModel.fromJSON({
                        value: 0,
                        name: 'Address',
                        text: labels['address'],
                    }),
                    EnumModel.fromJSON({
                        value: 1,
                        name: 'LaneAndIntersection',
                        text: labels['laneAndIntersection'],
                    }),
                    EnumModel.fromJSON({
                        value: 2,
                        name: 'Coordinates',
                        text: labels['coordinates'],
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
