import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import config from '../../../assets/config/config.json';
import {Survey} from '../shared/models/survey.model';
import {SurveyService} from '../shared/services/survey.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {confirm} from 'devextreme/ui/dialog';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-managementsurvey-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [SurveyService]
})
export class ListComponent  extends GridWithCrudService implements OnInit {

    private errorPopupVisibled = false;
    private labels = {};
    public surveyTypes = [];
    constructor(
        private router: Router,
        private surveyService: SurveyService,
        private translateService: TranslateService
    ) {
        super(surveyService);
    }

    setModel(data: any) {
        return Survey.fromJSON(data);
    }

    ngOnInit() {
        this.loadTranslation();
    }

    loadTranslation() {
        this.translateService.get([
            'surveyCopyQuestion', 'question', 'residential', 'general', 'agricultural'
        ]).subscribe(labels => {
            this.labels = labels;

            this.surveyTypes = [{value: 1, text: this.labels['residential']},
                                {value: 2, text: this.labels['general']},
                                {value: 3, text: this.labels['agricultural']}];

            this.loadSource();
        });

    }

    getSurveyName(data)  {
        const survey = Survey.fromJSON(data);
        return survey.getLocalization(config.locale);
    }

    public onInitNewRow(e) {
        e.data.isActive = true;
    }

    public onModifyQuestion(idSurvey) {
        this.surveyService.checkIfSurveyIsUsed(idSurvey).subscribe(bool => {
            this.errorPopupVisibled = bool;
            if(this.errorPopupVisibled == false) {
                this.router.navigate(['management/survey'], {
                    queryParams: {
                        id_survey: idSurvey
                    }
                });
            }
        });
        


    }

    public onCopySurvey(idSurvey) {
        confirm(this.labels['surveyCopyQuestion'], this.labels['question']).then((result) => {
            if (result) {
                this.surveyService.copySurvey(idSurvey)
                    .subscribe(success => this.loadSource());
            }
        });
    }
}
