import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConfigurationComponent } from './report-configuration.component';

describe('ReportConfigurationComponent', () => {
  let component: ReportConfigurationComponent;
  let fixture: ComponentFixture<ReportConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
