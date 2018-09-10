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

        if (this.authGuardService.hasUrlAccess('/inspection/dashboard')) {
            items.push({
                name: 'inspectionDashboard',
                path: '/inspection/dashboard',
            });
        }

        if (this.authGuardService.hasUrlAccess('/statistics')) {
            items.push({
                name: 'statistics',
                path: '/statistics',
            });
        }

        if (this.authGuardService.hasUrlAccess('/management/department')) {
            management.items.push({
                name: 'departmentManagement',
                path: '/management/department',
            });
        }

        if (this.authGuardService.hasUrlAccess('/management/survey')) {
            management.items.push({
                name: 'surveyManagement',
                path: '/management/survey',
            });
        }

        if (this.authGuardService.hasUrlAccess('/management/address')) {
            management.items.push({
                name: 'addressManagement',
                path: '/management/address',
            });
        }

        if (this.authGuardService.hasUrlAccess('/management/system')) {
            management.items.push({
                name: 'systemManagement',
                path: '/management/system',
            });
        }

        if (this.authGuardService.hasUrlAccess('/management/typesystem')) {
            management.items.push({
                name: 'typeSystemManagement',
                path: '/management/typesystem',
            });
        }

        if (this.authGuardService.hasUrlAccess('/report-configuration')) {
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
