import {Component, Input, OnInit} from '@angular/core';
import {InterventionPlan} from '../shared/models/intervention-plan';
import {RiskLevel} from '../shared/models/risk-level';
import {RiskLevelService} from '../../shared/services/risk-level.service';
import {LaneService} from '../shared/services/lane.service';
import {InterventionPlanBuildingForDisplay} from '../shared/models/intervention-plan-building-for-display';
import {FormBuilder, FormGroup} from '@angular/forms';
import {InterventionPlanService} from '../shared/services/intervention-plan.service';

import {InterventionPlanCourseService} from '../shared/services/intervention-plan-course.service';
import {InterventionPlanCourse} from '../shared/models/intervention-plan-course';

@Component({
  selector: 'app-intervention-survey-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.styl']
})
export class BuildingComponent implements OnInit {
  @Input() plan: InterventionPlan;
  courses: InterventionPlanCourse[];
  riskLevel: RiskLevel;
  planForm: FormGroup;
  idRiskLevel: string;

  constructor(
    private fb: FormBuilder,
    private planService: InterventionPlanService,
    public laneService: LaneService,
    private riskLevelService: RiskLevelService,
    private courseService: InterventionPlanCourseService
  ) {
    this.createForm();
    this.startWatchingForm();
  }

  get buildings(): InterventionPlanBuildingForDisplay[] {
    if (this.plan != null && this.plan.buildings != null) {
      return this.plan.buildings;
    }
    return [];
  }

  get mainBuilding(): InterventionPlanBuildingForDisplay {
    if (this.plan != null && this.plan.buildings != null) {
      const result = this.plan.buildings.filter(building => building.isParent === true);
      if (result.length > 0) {
        return result[0];
      }
    }
    return new InterventionPlanBuildingForDisplay();
  }

  private startWatchingForm() {
    this.planForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  loadRiskLevel() {
    this.riskLevelService.getById(this.mainBuilding.idRiskLevel)
      .subscribe(result => this.riskLevel = result);
  }

  loadCourses() {
    if (this.plan) {
      this.courseService.getAll(this.plan.id).subscribe((courses) => {
        this.courses = courses;
      });
    }
  }

  ngOnInit() {
    this.setValues();
    this.loadCourses();
    this.loadRiskLevel();
  }

  createForm() {
    this.planForm = this.fb.group({
      idLaneTransversal: ['']
    });
  }

  private setValues() {
    if (this.plan != null) {
      this.planForm.patchValue(this.plan);
      this.idRiskLevel = this.mainBuilding.idRiskLevel;
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
