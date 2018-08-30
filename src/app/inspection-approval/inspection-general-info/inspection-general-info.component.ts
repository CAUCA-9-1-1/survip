import {Component, Input, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {LaneService} from '../../management-department/shared/services/lane.service';
import {RiskLevelService} from '../../management-system/shared/services/risk-level.service';
import {UtilisationCodeService} from '../../management-system/shared/services/utilisation-code.service';
import {UtilisationCode} from '../../management-system/shared/models/utilisation-code.model';
import {InspectionDetailService} from '../shared/services/inspection-detail.service';


@Component({
    selector: 'app-inspection-general-info',
    templateUrl: './inspection-general-info.component.html',
    styleUrls: ['./inspection-general-info.component.scss'],
    providers: [
        InspectionDetailService,
        LaneService,
        RiskLevelService,
        UtilisationCodeService,
    ]
})
export class InspectionGeneralInfoComponent implements OnInit {
    @Input()
    set data(info: string) {
        this.generalInfo = info;
        this.loadData();
    }

    public generalInfo: any = {};
    public lane: string;
    public lanes: any = [];
    public riskLevel: string;
    public utilisationCode: string;

    constructor(
        private inspectionDetailService: InspectionDetailService,
        private laneService: LaneService,
        private riskService: RiskLevelService,
        private utilisationCodeService: UtilisationCodeService,
    ) { }

    public ngOnInit() {}

    public onChange(e) {
        if (this.generalInfo.idLaneTransversal !== e.component.option('value')) {
            this.inspectionDetailService.saveTransversale(this.generalInfo.idBuilding, e.component.option('value'));
        }
    }

    private loadData() {
        if (!this.generalInfo.idInspection) {
            return null;
        }

        this.laneService.getAllOfCity(this.generalInfo.idCity).subscribe(lanes => {
            this.lanes = lanes;

            this.lanes.forEach( lane => {
                if (lane.id === this.generalInfo.mainBuildingIdLane) {
                    this.lane = lane.name;
                }
            });
        });

        this.riskService.localized().subscribe(risks => {
            risks.forEach( risk => {
                if (risk.id === this.generalInfo.mainBuildingIdRiskLevel) {
                    this.riskLevel = risk.name;
                }
            });
        });

        this.utilisationCodeService.getAll().subscribe(codes => {
            codes.forEach( code => {
                if (code.id === this.generalInfo.mainBuildingIdUtilisationCode) {
                    code = UtilisationCode.fromJSON(code);

                    this.utilisationCode = code.getLocalization(config.locale, 'description');
                }
            });
        });
    }
}
