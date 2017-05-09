import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../test.module';
import { DxDataGridModule } from 'devextreme-angular';
import { ManagementAddressComponent } from './management-address.component';
import { CountryComponent } from './country/country.component';
import { CountryService } from '../core/services/country.service';

describe('ManagementAddressComponent', () => {
  let component: ManagementAddressComponent;
  let fixture: ComponentFixture<ManagementAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule, DxDataGridModule ],
      declarations: [
        ManagementAddressComponent,
        CountryComponent
      ],
      providers: [ CountryService ]
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
