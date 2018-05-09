import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmPanelsComponent } from './alarm-panels.component';

describe('AlarmPanelsComponent', () => {
  let component: AlarmPanelsComponent;
  let fixture: ComponentFixture<AlarmPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmPanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
