import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {WindowRefService} from 'cause-lib';

@Injectable()
export class AuthGuard implements CanActivate {
  private storage: any;

  constructor(private router: Router, private windowRef: WindowRefService) {
    this.storage = this.windowRef.nativeObject('localStorage');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storage.getItem('currentToken')) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: 'management/inspection' }});
    return false;
  }
}
