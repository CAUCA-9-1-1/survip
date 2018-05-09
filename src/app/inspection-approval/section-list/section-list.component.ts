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
    sections = [{
        name: 'buildingDetails',
    }, {
        name: 'survey',
    }, {
        name: 'contacts',
    }, {
        name: 'pnaps',
    }, {
        name: 'hazardousMaterials',
    }, {
        name: 'alarmPanels',
    }, {
        name: 'waterSprinkler',
    }, {
        name: 'particularRisks',
    }, {
        name: 'anomalies',
    }];

    constructor() {
        this.selected = 'buildingDetails';
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
