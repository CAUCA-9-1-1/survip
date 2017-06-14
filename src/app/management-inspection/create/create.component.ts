import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

import {Webuser} from '../../management-access/shared/models/webuser.model';
import {WebuserService} from '../../management-access/shared/services/webuser.service';
import {Survey} from '../../management-survey/shared/models/survey.model';
import {SurveyService} from '../../management-survey/shared/services/survey.service';

@Component({
  selector: 'app-management-inspection-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.styl'],
  providers: [
    WebuserService,
    SurveyService,
  ]
})
export class CreateComponent implements OnInit {
  users: Webuser[] = [];
  surveys: Survey[] = [];
  inspection: object = {
    idSurvey: '',
    idWebuser: ''
  };

  constructor(
    private dialogRef: MdDialogRef<CreateComponent>,
    private webuserService: WebuserService,
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.loadWebuser();
    this.loadSurvey();
  }

  public onOK() {
    this.dialogRef.close(this.inspection);
  }

  public onCancel() {
    this.dialogRef.close(null);
  }

  private loadWebuser() {
    this.webuserService.getAll().subscribe(data => this.users = data);
  }

  private loadSurvey() {
    this.surveyService.getAll().subscribe(data => this.surveys = data);
  }
}
