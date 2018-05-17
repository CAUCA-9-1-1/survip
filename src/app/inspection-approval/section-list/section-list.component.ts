import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-section-list',
    templateUrl: './section-list.component.html',
    styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {
    @Output() selectionChange = new EventEmitter();

    selected = '';
    sectionsInspection = [{
        name: 'generalInfo',
    }, {
        name: 'implantationPlan',
    }, {
        name: 'course',
    }, {
        name: 'waterSupply',
    }, {
        name: 'survey',
    }];
    sectionsBuilding = [{
        name: 'buildingDetails',
    }, {
        name: 'contacts',
    }, {
        name: 'pnaps',
    }, {
        name: 'hazardousMaterials',
    }, {
        name: 'fireProtection',
    }, {
        name: 'particularRisks',
    }, {
        name: 'anomalies',
    }];

    constructor() {
        this.selected = 'generalInfo';
    }

    ngOnInit() { }

    goto(name) {
        this.selected = name;
        this.selectionChange.emit(name);
    }

    isSelected(path) {
        return (this.selected.indexOf(path) > -1 ? 'selected' : '');
    }
}
