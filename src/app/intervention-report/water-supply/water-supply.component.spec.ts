import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterSupplyComponent } from './water-supply.component';

describe('WaterSupplyComponent', () => {
  let component: WaterSupplyComponent;
  let fixture: ComponentFixture<WaterSupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterSupplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
