import {Injectable, Injector} from '@angular/core';
import {RequestService} from '../../../shared/services/request.service';
import {Observable} from 'rxjs/index';
import {Picture} from '../../../shared/models/picture.model';

@Injectable()
export class InspectionPictureService extends RequestService {

  constructor(injector: Injector) {
    super(injector);
  }

  getOne(idPicture: string): Observable<Picture> {
    return this.get('InspectionPicture/' + idPicture);
  }

  save(picture: Picture): Observable<string> {
    return this.put('InspectionPicture', picture);
  }
}
