import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestService} from './request.service';

@Injectable()
export class RefreshTokenService extends RequestService {

  constructor(injector: Injector) {
    super(injector);
  }

  public getNewToken(): Observable<any> {
    return this.post('Authentification/Refresh', {
      accessToken: sessionStorage.getItem('accessToken'),
      refreshToken: sessionStorage.getItem('refreshToken')
    });
  }
}
