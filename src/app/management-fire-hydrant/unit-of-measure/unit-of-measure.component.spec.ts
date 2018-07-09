import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module.spec';
import { UnitOfMeasureComponent } from './unit-of-measure.component';

describe('UnitOfMeasureComponent', () => {
  let component: UnitOfMeasureComponent;
  let fixture: ComponentFixture<UnitOfMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ UnitOfMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
