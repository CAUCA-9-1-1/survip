import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplantationPlanComponent } from './implantation-plan.component';

describe('ImplantationPlanComponent', () => {
  let component: ImplantationPlanComponent;
  let fixture: ComponentFixture<ImplantationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImplantationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplantationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
