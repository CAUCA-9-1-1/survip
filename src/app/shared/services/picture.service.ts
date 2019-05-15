import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from './request.service';
import {Picture} from '../models/picture.model';
import {ConfigurationService} from '../../user-access/shared/services/configuration.service';


@Injectable()
export class PictureService extends RequestService {

    constructor(injector: Injector, private config: ConfigurationService) {
        super(injector);
    }

    getOne(idPicture: string): Observable<Picture> {
        return this.get('Picture/' + idPicture);
    }

    save(picture: Picture): Observable<string> {
        return this.put('Picture', picture);
    }

    public async isPictureSizeValid(picUrl: string) {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', picUrl, true);
        xhr.responseType = 'blob';
        const imageBlob = await new Promise((resolve) => {
            xhr.onload = e => {
                console.log("taille de l'image : ", xhr.response.size);
                if (xhr.status === 200 && xhr.response.type.startsWith('image/')) {
                    if ((xhr.response.size / 1000000.0) < this.config.maximumUploadSize) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            }
            xhr.send();
        });

        return imageBlob;
    }
}


