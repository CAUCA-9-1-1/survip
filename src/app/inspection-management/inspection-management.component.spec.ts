import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionManagementComponent } from './inspection-management.component';

describe('InspectionManagementComponent', () => {
  let component: InspectionManagementComponent;
  let fixture: ComponentFixture<InspectionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
