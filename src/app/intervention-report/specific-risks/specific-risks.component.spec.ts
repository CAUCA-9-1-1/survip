import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificRisksComponent } from './specific-risks.component';

describe('SpecificRisksComponent', () => {
  let component: SpecificRisksComponent;
  let fixture: ComponentFixture<SpecificRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
