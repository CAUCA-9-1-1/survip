import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestModule } from '../test.module';
import { InterventionSurveyComponent } from './intervention-survey.component';
import { BuildingComponent } from './building/building.component';
import { BuildingDetailComponent } from './building-detail/building-detail.component';
import { CardLayoutComponent } from './card-layout/card-layout.component';
import { ContactComponent } from './contact/contact.component';
import { DangerousMaterialComponent } from './dangerous-material/dangerous-material.component';
import { FireHydrantComponent } from './fire-hydrant/fire-hydrant.component';
import { FireProtectionComponent } from './fire-protection/fire-protection.component';
import { ImplantationPlanComponent } from './implantation-plan/implantation-plan.component';
import { ParticularRiskComponent } from './particular-risk/particular-risk.component';
import { PersonRequiringAssistanceComponent } from './person-requiring-assistance/person-requiring-assistance.component';
import { CardLayoutFactoryDirective } from './shared/control-factory.directive';
import { BuildingContactService } from './shared/services/building-contact.service';

describe('InterventionSurveyComponent', () => {
  let component: InterventionSurveyComponent;
  let fixture: ComponentFixture<InterventionSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule, RouterTestingModule ],
      declarations: [
        BuildingDetailComponent,
        BuildingComponent,
        ImplantationPlanComponent,
        ContactComponent,
        PersonRequiringAssistanceComponent,
        FireProtectionComponent,
        DangerousMaterialComponent,
        FireHydrantComponent,
        ParticularRiskComponent,
        CardLayoutComponent,
        CardLayoutFactoryDirective,
        InterventionSurveyComponent
      ],
      providers: [ BuildingContactService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
