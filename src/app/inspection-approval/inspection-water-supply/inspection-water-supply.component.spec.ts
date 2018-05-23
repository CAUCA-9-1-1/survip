import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionWaterSupplyComponent } from './inspection-water-supply.component';

describe('InspectionWaterSupplyComponent', () => {
  let component: InspectionWaterSupplyComponent;
  let fixture: ComponentFixture<InspectionWaterSupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionWaterSupplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionWaterSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
