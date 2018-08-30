import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../test.module.spec';
import {ManagementAddressComponent} from './management-address.component';
import {CountryComponent} from './country/country.component';
import {CountryService} from './shared/services/country.service';
import {StateComponent} from './state/state.component';
import {RegionComponent} from './region/region.component';
import {LaneComponent} from '../management-department/lane/lane.component';
import {CountyComponent} from './county/county.component';
import {CityTypeComponent} from '../management-type-system/city-type/city-type.component';
import {CityComponent} from './city/city.component';

describe('ManagementAddressComponent', () => {
  let component: ManagementAddressComponent;
  let fixture: ComponentFixture<ManagementAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [
        ManagementAddressComponent,
        CountryComponent,
        StateComponent,
        RegionComponent,
        LaneComponent,
        CountyComponent,
        CityTypeComponent,
        CityComponent,
      ]
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
