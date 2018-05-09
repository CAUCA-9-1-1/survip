import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionApprovalComponent } from './inspection-approval.component';

describe('InspectionApprovalComponent', () => {
  let component: InspectionApprovalComponent;
  let fixture: ComponentFixture<InspectionApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
