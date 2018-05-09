import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
    selected = '';
    inspection = [{
        name: 'inspectionDashboard',
        path: '/inspection/dashboard',
    }, {
        name: 'inspectionBatch',
        path: '/inspection/batch',
    }];
    management = [{
        name: 'interventionPlanManagement',
        path: '/management/interventionplan',
    }, {
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
    }

    isSelected(path) {
        return (this.selected.indexOf(path) > -1 ? 'selected' : '');
    }
}
