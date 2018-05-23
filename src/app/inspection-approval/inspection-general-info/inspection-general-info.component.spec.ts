import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionGeneralInfoComponent } from './inspection-general-info.component';

describe('InspectionGeneralInfoComponent', () => {
  let component: InspectionGeneralInfoComponent;
  let fixture: ComponentFixture<InspectionGeneralInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionGeneralInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
