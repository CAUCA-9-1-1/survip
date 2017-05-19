import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TestModule} from '../test.module';
import {PreventionReportComponent} from './prevention-report.component';

describe('PreventionReportComponent', () => {
  let component: PreventionReportComponent;
  let fixture: ComponentFixture<PreventionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        RouterTestingModule
      ],
      declarations: [PreventionReportComponent]
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
