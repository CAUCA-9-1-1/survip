import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

import {AuthGuardService} from '../../services/auth-guard.service';


@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
    @Output() click = new EventEmitter();

    selected = '';
    menus = [];

    public constructor(
        private router: Router,
        private authGuardService: AuthGuardService,
    ) {
        this.selected = this.router.url;
    }

    public ngOnInit() {}

    public refresh() {
        const items = [];
        const management = {
            name: 'management',
            path: '',
            items: [],
        };

        if (this.authGuardService.hasRight('RightDashboard')) {
            items.push({
                name: 'inspectionDashboard',
                path: '/inspection/dashboard',
            });
        }

        if (this.authGuardService.hasRight('RightStatistics')) {
            items.push({
                name: 'statistics',
                path: '/statistics',
            });
        }

        if (this.authGuardService.hasRight('RightManagement')) {
            management.items.push({
                name: 'buildingManagement',
                path: '/management/building',
            });

            management.items.push({
                name: 'inspectionManagement',
                path: '/inspection/management',
            });
        }

        if (this.authGuardService.hasRight('RightAdmin')) {
            management.items.push({
                name: 'addressManagement',
                path: '/management/address',
            });

            management.items.push({
                name: 'fireHydrantManagement',
                path: '/management/firehydrant',
            });

            management.items.push({
                name: 'surveyManagement',
                path: '/management/survey',
            });

            management.items.push({
                name: 'accessManagement',
                path: '/management/access',
            });

            management.items.push({
                name: 'reportConfiguration',
                path: '/report-configuration',
            });
        }

        if (management.items.length) {
            items.push(management);
        }

        this.menus = items;
    }

    public goto(path) {
        if (!this.authGuardService.hasUrlAccess(path)) {
            return false;
        }

        this.selected = path;
        this.router.navigate([path]);
        this.click.emit({
            path: path
        });
    }

    public isSelected(path) {
        if (!this.selected) {
            return '';
        }

        return (this.selected.indexOf(path) > -1 ? 'selected' : '');
    }
}
