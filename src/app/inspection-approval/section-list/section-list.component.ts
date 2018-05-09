import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-section-list',
    templateUrl: './section-list.component.html',
    styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {
    selected = '';
    sections = [{
        name: 'buildingDetails',
    }, {
        name: 'survey',
    }, {
        name: 'contacts',
    }, {
        name: 'pnaps',
    }, {
        name: 'hazardousMaterial',
    }, {
        name: 'alarmPanels',
    }, {
        name: 'waterSprinkler',
    }, {
        name: 'particularRisks',
    }, {
        name: 'anomalies',
    }];

    constructor(
        private router: Router,
    ) {
        this.selected = '';
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
