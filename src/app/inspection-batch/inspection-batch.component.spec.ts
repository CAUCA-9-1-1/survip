import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionBatchComponent } from './inspection-batch.component';

describe('InspectionBatchComponent', () => {
  let component: InspectionBatchComponent;
  let fixture: ComponentFixture<InspectionBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
