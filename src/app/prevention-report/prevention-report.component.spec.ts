import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventionReportComponent } from './prevention-report.component';

describe('PreventionReportComponent', () => {
  let component: PreventionReportComponent;
  let fixture: ComponentFixture<PreventionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
