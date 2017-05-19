import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TestModule} from '../test.module';
import {InterventionListComponent} from './intervention-list.component';
import {RiskLevelService} from '../shared/services/risk-level.service';
import {InspectionService} from '../shared/services/inspection.service';

describe('InterventionListComponent', () => {
  let component: InterventionListComponent;
  let fixture: ComponentFixture<InterventionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, RouterTestingModule],
      declarations: [InterventionListComponent],
      providers: [
        RiskLevelService,
        InspectionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
