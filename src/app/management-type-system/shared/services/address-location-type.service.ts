import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {RequestService} from '../../../shared/services/request.service';
import {EnumModel} from '../models/enum.model';


@Injectable()
export class AddressLocationTypeService extends RequestService {
    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<EnumModel[]> {
        return this.translateService.get([
            'nextTo', 'atTheAddress', 'backWard', 'atEnd', 'atCorner', 'above', 'under', 'inFront', 'near', 'visibleFrom'
        ]).pipe(
            map(labels => {
                return [
                    EnumModel.fromJSON({
                        value: 0,
                        name: 'NextTo',
                        text: this.translateService.instant('nextTo'),
                    }),
                    EnumModel.fromJSON({
                        value: 1,
                        name: 'AtTheAddress',
                        text: this.translateService.instant('atTheAddress'),
                    }),
                    EnumModel.fromJSON({
                        value: 2,
                        name: 'BackWard',
                        text: this.translateService.instant('backward'),
                    }),
                    EnumModel.fromJSON({
                        value: 3,
                        name: 'AtEnd',
                        text: this.translateService.instant('atTheEnd'),
                    }),
                    EnumModel.fromJSON({
                        value: 4,
                        name: 'AtCorner',
                        text: this.translateService.instant('atTheCorner'),
                    }),
                    EnumModel.fromJSON({
                        value: 5,
                        name: 'Above',
                        text: this.translateService.instant('above'),
                    }),
                    EnumModel.fromJSON({
                        value: 6,
                        name: 'Under',
                        text: this.translateService.instant('under'),
                    }),
                    EnumModel.fromJSON({
                        value: 7,
                        name: 'InFront',
                        text: this.translateService.instant('inFront'),
                    }),
                    EnumModel.fromJSON({
                        value: 8,
                        name: 'Near',
                        text: this.translateService.instant('near'),
                    }),
                    EnumModel.fromJSON({
                        value: 9,
                        name: 'VisibleFrom',
                        text: this.translateService.instant('visibleFrom'),
                    })
                ];
            })
        );
    }
}
