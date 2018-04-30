import {Component, OnInit} from '@angular/core';
import {GridWithCrudService} from '../shared/classes/grid-with-crud-service';
import {InspectionBatchService} from './shared/services/inspection-batch.service';
import {WebuserService} from '../management-access/shared/services/webuser.service';
import {Webuser} from '../management-access/shared/models/webuser.model';


@Component({
    selector: 'app-inspection-batch',
    templateUrl: './inspection-batch.component.html',
    styleUrls: ['./inspection-batch.component.scss'],
    providers: [
        InspectionBatchService,
        WebuserService,
    ],
})
export class InspectionBatchComponent extends GridWithCrudService implements OnInit {
    webusers: Webuser[];
    inspectors: Webuser[] = [];

    constructor(
        batchService: InspectionBatchService,
        private webuserService: WebuserService,
    ) {
        super(batchService);
    }

    ngOnInit() {
        this.loadSource();
        this.loadWebuser();
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    addInspector(e) {
        const inspector = Object.assign({}, e.selectedItem);

        if ('id' in inspector) {
            this.inspectors.push(inspector);

            e.component.option('value', '');
        }
    }

    removeInspector(item) {
        let find = -1;

        this.inspectors.forEach((inspector, index) => {
            if (inspector.id === item.id) {
                find = index;
            }
        });

        if (find > -1) {
            this.inspectors.splice(find, 1);
        }
    }

    private loadWebuser() {
        this.webuserService.getActive().subscribe(data => this.webusers = data);
    }
}
