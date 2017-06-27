import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorTypeComponent } from './operator-type.component';

describe('UnitOfMeasureComponent', () => {
  let component: OperatorTypeComponent;
  let fixture: ComponentFixture<OperatorTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
