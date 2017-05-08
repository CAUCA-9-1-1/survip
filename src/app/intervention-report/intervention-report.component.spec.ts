import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { InterventionReportComponent } from './intervention-report.component';
import { SharedModule } from '../shared/shared.module';
import { AdditionalInformationComponent } from './additional-information/additional-information.component';
import { AddressComponent } from './address/address.component';
import { BuildingInformationComponent } from './building-information/building-information.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FireProtectionComponent } from './fire-protection/fire-protection.component';
import { ImplantationComponent } from './implantation/implantation.component';
import { PersonRequiringAssistanceComponent } from './person-requiring-assistance/person-requiring-assistance.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { SpecificRisksComponent } from './specific-risks/specific-risks.component';
import { WaterSupplyComponent } from './water-supply/water-supply.component';
import { AddressService } from './shared/address.service';
import { ContactService } from './shared/contact.service';

describe('InterventionReportComponent', () => {
  let component: InterventionReportComponent;
  let fixture: ComponentFixture<InterventionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, RouterTestingModule ],
      declarations: [
        AdditionalInformationComponent,
        AddressComponent,
        BuildingInformationComponent,
        ContactsComponent,
        FireProtectionComponent,
        ImplantationComponent,
        PersonRequiringAssistanceComponent,
        ProtocolComponent,
        SpecificRisksComponent,
        WaterSupplyComponent,
        InterventionReportComponent
      ],
      providers: [
        AddressService,
        ContactService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
