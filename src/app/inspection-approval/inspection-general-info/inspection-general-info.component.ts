import {Component, Input, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {RiskLevelService} from '../../management-building/shared/services/risk-level.service';
import {UtilisationCodeService} from '../../management-building/shared/services/utilisation-code.service';
import {UtilisationCode} from '../../management-building/shared/models/utilisation-code.model';
import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-inspection-general-info',
    templateUrl: './inspection-general-info.component.html',
    styleUrls: ['./inspection-general-info.component.scss'],
    providers: [
        InspectionService,
        LaneService,
        RiskLevelService,
        UtilisationCodeService,
    ]
})
export class InspectionGeneralInfoComponent implements OnInit {
    @Input() inspectionId: string;

    generalInfo: any = {};
    lane: string;
    transversal: string;
    riskLevel: string;
    utilisationCode: string;

    constructor(
        private inspectionService: InspectionService,
        private laneService: LaneService,
        private riskService: RiskLevelService,
        private utilisationCodeService: UtilisationCodeService,
    ) { }

    ngOnInit() {
        if (!this.inspectionId) {
            return null;
        }

        this.inspectionService.getGeneralInfo(this.inspectionId).subscribe(data => {
            this.generalInfo = data;

            this.laneService.getAllOfCity(data.idCity).subscribe(lanes => {
                lanes.forEach( lane => {
                    if (lane.id === data.mainBuildingIdLane) {
                        this.lane = lane.name;
                    }
                    if (lane.id === data.idLaneTransversal) {
                        this.transversal = lane.name;
                    }
                });
            });

            this.riskService.localized().subscribe(risks => {
                risks.forEach( risk => {
                    if (risk.id === data.mainBuildingIdRiskLevel) {
                        this.riskLevel = risk.name;
                    }
                });
            });

            this.utilisationCodeService.getAll().subscribe(codes => {
                codes.forEach( code => {
                    if (code.id === data.mainBuildingIdUtilisationCode) {
                        code = UtilisationCode.fromJSON(code);

                        this.utilisationCode = code.getLocalization(config.locale.use, 'description');
                    }
                });
            });
        });
    }
}
