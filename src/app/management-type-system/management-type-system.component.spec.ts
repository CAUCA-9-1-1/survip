import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../test.module.spec';
import { ManagementTypeSystemComponent } from './management-type-system.component';
import { FirehydrantComponent } from '../management-department/firehydrant/firehydrant.component';
import { FireHydrantTypeComponent } from './fire-hydrant-type/fire-hydrant-type.component';
import { ConnectionTypeComponent } from './connection-type/connection-type.component';
import { OperatorTypeComponent } from './operator-type/operator-type.component';
import { UnitOfMeasureComponent } from './unit-of-measure/unit-of-measure.component';

describe('ManagementTypeSystemComponent', () => {
  let component: ManagementTypeSystemComponent;
  let fixture: ComponentFixture<ManagementTypeSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [
        ManagementTypeSystemComponent,
        FirehydrantComponent,
        FireHydrantTypeComponent,
        ConnectionTypeComponent,
        OperatorTypeComponent,
        UnitOfMeasureComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementTypeSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
