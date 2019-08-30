import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Permission} from '../../user-access/shared/models/permission.model';


@Injectable()
export class AuthGuardService implements CanActivate {
    private permissions: Permission[] = [];

    public constructor(
        private router: Router,
    ) { }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) {
        const access = this.hasUrlAccess(state.url);

        if (!access) {
            if (sessionStorage.getItem('accessToken')) {
                history.back();
            } else {
                this.router.navigate(['/login'], { queryParams: { returnUrl: 'inspection/dashboard' }});
            }
        }

        return access;
    }

    public hasUrlAccess(url) {
        if (url === '/inspection/batch') {
            url = '/inspection/dashboard';
        }

        return this.hasRight('url' + url.replaceAll('/', '-'));
    }

    public hasRight(right) {
        this.checkToLoadPermission();

        const access = this.permissions.filter(item => {
            if (item.featureName === right) {
                return item.access;
            }

            return false;
        });

        return (access.length > 0);
    }

    private checkToLoadPermission() {
        this.permissions = [];

        if (sessionStorage.getItem('currentWebuser') && sessionStorage.getItem('currentPermission')) {
            this.permissions = JSON.parse(sessionStorage.getItem('currentPermission'));
        }
    }
}
