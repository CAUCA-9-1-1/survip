import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from './request.service';
import {Picture} from '../models/picture.model';
import 'rxjs/add/operator/catch';


@Injectable()
export class PictureService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    get(idPicture: string) {
        return this.http.get<Picture>(this.apiUrl + 'Picture/' + idPicture, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(picture: Picture) {
        return this.http.put(
            this.apiUrl + 'Picture',
            JSON.stringify(picture),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }
}
