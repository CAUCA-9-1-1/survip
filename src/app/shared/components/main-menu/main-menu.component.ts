import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
    @Output() click = new EventEmitter();

    selected = '';
    menus = [{
        name: 'inspectionDashboard',
        path: '/inspection/dashboard',
    }, {
        name: 'statistics',
        path: '/statistics',
    }, {
        name: 'management',
        path: '',
        items: [{
            name: 'surveyManagement',
            path: '/management/survey',
        }, {
            name: 'buildingManagement',
            path: '/management/building',
        }, {
            name: 'addressManagement',
            path: '/management/address',
        }, {
            name: 'fireHydrantManagement',
            path: '/management/firehydrant',
        }, {
            name: 'accessManagement',
            path: '/management/access',
        }, {
            name: 'inspectionBatchManagement',
            path: '/inspection/batch',
        }, {
            name: 'inspectionManagement',
            path: '/inspection/management',
        }, {
            name: 'reportConfiguration',
            path: '/report-configuration',
        }]
    }];

    constructor(
        private router: Router,
    ) {
        this.selected = this.router.url;
    }

    ngOnInit() { }

    goto(path) {
        this.selected = path;
        this.router.navigate([path]);
        this.click.emit({
            path: path
        });
    }

    isSelected(path) {
        if (!this.selected) {
            return '';
        }

        return (this.selected.indexOf(path) > -1 ? 'selected' : '');
    }
}
