import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {RequestService} from './request.service';


@Injectable()
export class PictureService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    get(idPicture: string) {
        return this.http.get(this.apiUrl + 'Picture/' + idPicture, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
