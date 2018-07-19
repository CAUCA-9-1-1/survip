import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from './request.service';
import {Picture} from '../models/picture.model';


@Injectable()
export class PictureService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getOne(idPicture: string): Observable<Picture> {
        return this.get('Picture/' + idPicture);
    }

    save(picture: Picture): Observable<string> {
        return this.put('Picture', picture);
    }
}
