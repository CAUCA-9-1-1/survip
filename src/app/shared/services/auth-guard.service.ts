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
        let right = '';

        switch (url) {
            case '/inspection/dashboard':
            case '/inspection/batch':
                right = 'RightDashboard';
                break;
            case '/statistics':
                right = 'RightStatistics';
                break;
            case '/inspection/management':
            case '/management/building':
                right = 'RightManagement';
                break;
            case '/management/access':
            case '/management/address':
            case '/management/firehydrant':
            case '/management/survey':
            case '/report-configuration':
                right = 'RightAdmin';
                break;
        }

        return this.hasRight(right);
    }

    public hasRight(right) {
        this.checkToLoadPermission();

        const access = this.permissions.filter(item => {
            if (item.feature.featureName === right) {
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
