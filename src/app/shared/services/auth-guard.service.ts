import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {PermissionService} from '../../management-access/shared/services/permission.service';
import {Permission} from '../../management-access/shared/models/permission.model';


@Injectable()
export class AuthGuardService implements CanActivate {
    private permissions: Permission[] = [];

    public constructor(
        private router: Router,
        private permissionService: PermissionService,
    ) { }

    public async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) {
        this.permissions = await this.permissionService.getUserPermission(sessionStorage.getItem('currentWebuser')).toPromise();

        let access = false;
        if (sessionStorage.getItem('accessToken') && this.permissions.length > 0) {
            access = this.hasPermission(state.url);
        }

        if (!access) {
            if (sessionStorage.getItem('accessToken')) {
                history.back();
            } else {
                this.router.navigate(['/login'], { queryParams: { returnUrl: 'inspection/dashboard' }});
            }
        }

        return access;
    }

    public hasPermission(url) {
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
                right = 'RightAdmin';
                break;
        }

        const access = this.permissions.filter(item => {
            if (item.feature.featureName === right) {
                return item.access;
            }

            return false;
        });

        return (access.length > 0);
    }
}
