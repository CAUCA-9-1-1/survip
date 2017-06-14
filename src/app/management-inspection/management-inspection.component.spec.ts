import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementInspectionComponent } from './management-inspection.component';

describe('ManagementInspectionComponent', () => {
  let component: ManagementInspectionComponent;
  let fixture: ComponentFixture<ManagementInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
