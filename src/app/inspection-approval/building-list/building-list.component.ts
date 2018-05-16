import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-building-list',
    templateUrl: './building-list.component.html',
    styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent implements OnInit {
    @Input() selected: string;

    buildings = [{
        name: 'test'
    }];

    constructor() { }

    ngOnInit() {
    }
}
