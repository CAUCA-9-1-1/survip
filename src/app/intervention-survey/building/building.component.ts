import {Component, Input, OnInit} from '@angular/core';
import {InterventionPlan} from '../shared/models/intervention-plan';
import {RiskLevel} from '../shared/models/risk-level';
import {RiskLevelService} from '../../shared/services/risk-level.service';
import {LaneService} from '../shared/services/lane.service';
import {InterventionPlanBuildingForDisplay} from '../shared/models/intervention-plan-building-for-display';
import {FormBuilder, FormGroup} from '@angular/forms';
import {InterventionPlanService} from '../shared/services/intervention-plan.service';

@Component({
  selector: 'app-intervention-survey-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.styl']
})
export class BuildingComponent implements OnInit {
  @Input() plan: InterventionPlan;
  riskLevels: RiskLevel[];
  planForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private planService: InterventionPlanService,
    public laneService: LaneService,
    private riskLevelService: RiskLevelService) {
    this.loadRiskLevels();
    this.createForm();
    this.startWatchingForm();
  }

  get mainBuilding(): InterventionPlanBuildingForDisplay {
    if (this.plan != null) {
      const result = this.plan.buildings.filter(building => building.isParent === true);
      if (result.length > 0) {
        return result[0];
      }
    }
    return null;
  }

  private startWatchingForm() {
    this.planForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  loadRiskLevels() {
    this.riskLevelService.getAll()
      .subscribe(result => this.riskLevels = result);
  }

  ngOnInit() {
    this.setValues();
  }

  createForm() {
    this.planForm = this.fb.group({
      idLaneTransversal: ['']
    });
  }

  private setValues() {
    if (this.plan != null) {
      this.planForm.patchValue(this.plan);
    }
  }

  private saveIfValid() {
    if (this.planForm.valid && this.planForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    console.log('saving plan...');
    const formModel  = this.planForm.value;
    Object.assign(this.plan, formModel);
    this.planService.update(this.plan)
      .then(() => console.log('Plan saved.'));
  }
}
