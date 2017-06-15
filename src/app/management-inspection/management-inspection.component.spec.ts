import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../test.module';
import {ManagementInspectionComponent} from './management-inspection.component';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';
import {StatisticsComponent} from './statistics/statistics.component';

describe('ManagementInspectionComponent', () => {
  let component: ManagementInspectionComponent;
  let fixture: ComponentFixture<ManagementInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [
        ManagementInspectionComponent,
        ListComponent,
        CreateComponent,
        StatisticsComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
