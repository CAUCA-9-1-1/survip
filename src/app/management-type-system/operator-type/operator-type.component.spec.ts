import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module.spec';
import { OperatorTypeComponent } from './operator-type.component';

describe('UnitOfMeasureComponent', () => {
  let component: OperatorTypeComponent;
  let fixture: ComponentFixture<OperatorTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ OperatorTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
