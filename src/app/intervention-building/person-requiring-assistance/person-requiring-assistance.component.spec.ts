import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { PersonRequiringAssistanceComponent } from './person-requiring-assistance.component';
import {PersonRequiringAssistanceTypeService} from '../../intervention-survey/shared/services/person-requiring-assistance-type.service';
import {BuildingPersonRequiringAssistanceService} from '../../intervention-survey/shared/services/building-person-requiring-assistance.service';

describe('PersonRequiringAssistanceComponent', () => {
  let component: PersonRequiringAssistanceComponent;
  let fixture: ComponentFixture<PersonRequiringAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [PersonRequiringAssistanceComponent],
      providers: [
        BuildingPersonRequiringAssistanceService,
        PersonRequiringAssistanceTypeService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRequiringAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
