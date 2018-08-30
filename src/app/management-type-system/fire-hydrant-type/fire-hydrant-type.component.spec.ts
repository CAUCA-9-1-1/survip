import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module.spec';
import { FireHydrantTypeComponent } from './fire-hydrant-type.component';

describe('FireHydrantTypeComponent', () => {
  let component: FireHydrantTypeComponent;
  let fixture: ComponentFixture<FireHydrantTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ FireHydrantTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireHydrantTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
