import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionReportComponent } from './intervention-report.component';

describe('InterventionReportComponent', () => {
  let component: InterventionReportComponent;
  let fixture: ComponentFixture<InterventionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionReportComponent ]
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
