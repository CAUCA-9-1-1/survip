import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
    items = [{
        name: 'inspectionManagement',
        path: '/inspection/dashboard/',
    }, {
        name: 'interventionPlanManagement',
        path: '/management/interventionplan/',
    }, {
        name: 'surveyManagement',
        path: '/management/survey/',
    }, {
        name: 'buildingManagement',
        path: '/management/building/',
    }, {
        name: 'addressManagement',
        path: '/management/address/',
    }, {
        name: 'fireHydrantManagement',
        path: '/management/firehydrant/',
    }, {
        name: 'accessManagement',
        path: '/management/access/',
    }];

    constructor(private router: Router) { }

    ngOnInit() {
    }

    goto(path) {
        this.router.navigate([path]);
    }
}
