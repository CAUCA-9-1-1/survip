import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInspectionComponent } from './dashboard-inspection.component';

describe('DashboardInspectionComponent', () => {
  let component: DashboardInspectionComponent;
  let fixture: ComponentFixture<DashboardInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
