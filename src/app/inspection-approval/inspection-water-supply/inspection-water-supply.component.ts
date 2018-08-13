import {Component, Input, OnInit} from '@angular/core';

import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {FireHydrant} from '../../management-fire-hydrant/shared/models/fire-hydrant.model';
import {InspectionFireHydrantService} from '../shared/services/inspection-fire-hydrant.service';
import {FireHydrantService} from '../../management-fire-hydrant/shared/services/fire-hydrant.service';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {Lane} from '../../management-address/shared/models/lane.model';


@Component({
    selector: 'app-inspection-water-supply',
    templateUrl: './inspection-water-supply.component.html',
    styleUrls: ['./inspection-water-supply.component.scss'],
    providers: [
        InspectionFireHydrantService,
        FireHydrantService,
        LaneService,
    ],
})
export class InspectionWaterSupplyComponent extends GridWithCrudService implements OnInit {
    @Input()
    set inspection(id: string) {
        this.idInspection = id;
        this.loadData();
    }

    private idInspection: string;
    public lanes: Lane[];
    public listFireHydrants = {
        dataSource: [],
        searchExpr: ['address', 'number'],
        valueExpr: 'id',
        displayExpr: (data) => {
            if (!data) {
                return '';
            }

            return data.number + ', ' + data.address;
        }
    };
    public lookupFireHydrants = {
        dataSource: [],
        valueExpr: 'id',
        displayExpr: 'number',
    };

    constructor(
        inspectionFireHydrantService: InspectionFireHydrantService,
        private fireHydrantService: FireHydrantService,
        private laneService: LaneService,
    ) {
        super(inspectionFireHydrantService);
    }

    public ngOnInit() { }

    public setModel(data: any) {
        return FireHydrant.fromJSON(data);
    }

    public loadData() {
        if (!this.idInspection) {
            return null;
        }

        this.laneService.localized().subscribe( lanes => {
            this.lanes = lanes;

            this.fireHydrantService.getAll().subscribe( data => {
                this.listFireHydrants.dataSource = data;
                this.lookupFireHydrants.dataSource = data;

                this.listFireHydrants.dataSource.forEach((item, index) => {
                    this.listFireHydrants.dataSource[index].address = this.getAddress(item);
                });
            });
        });
        this.loadSource(this.idInspection);
    }

    public onEditorPreparing(e) {
        if (e.dataField === 'idFireHydrant') {
            e.editorName = 'dxLookup';
        }
    }

    public onRowInserted(e) {
        console.log(e);
    }

    private getAddress(fireHydrant) {
        if (!this.lanes) {
            return '';
        }

        const names = [];
        this.lanes.forEach((item) => {
            if (item.id === fireHydrant.idLane) {
                names[0] = item.name;
            } else if (item.id === fireHydrant.idIntersection) {
                names[1] = item.name;
            }
        });

        return names.join(' / ');
    }
}
