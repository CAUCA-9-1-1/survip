import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAddressComponent } from './management-address.component';

describe('ManagementAddressComponent', () => {
  let component: ManagementAddressComponent;
  let fixture: ComponentFixture<ManagementAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
