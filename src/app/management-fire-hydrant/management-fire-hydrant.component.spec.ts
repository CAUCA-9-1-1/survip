import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../test.module.spec';
import { ManagementFireHydrantComponent } from './management-fire-hydrant.component';
import { ListComponent } from './list/list.component';
import { TypeComponent } from './type/type.component';
import { ConnectionTypeComponent } from './connection-type/connection-type.component';
import { OperatorTypeComponent } from './operator-type/operator-type.component';
import { UnitOfMeasureComponent } from './unit-of-measure/unit-of-measure.component';

describe('ManagementFireHydrantComponent', () => {
  let component: ManagementFireHydrantComponent;
  let fixture: ComponentFixture<ManagementFireHydrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [
        ManagementFireHydrantComponent,
        ListComponent,
        TypeComponent,
        ConnectionTypeComponent,
        OperatorTypeComponent,
        UnitOfMeasureComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementFireHydrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
