import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../test.module';
import { ManagementAddressComponent } from './management-address.component';
import { SharedModule } from '../shared/shared.module';

describe('ManagementAddressComponent', () => {
  let component: ManagementAddressComponent;
  let fixture: ComponentFixture<ManagementAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
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
