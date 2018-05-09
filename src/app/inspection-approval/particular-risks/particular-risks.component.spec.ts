import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularRisksComponent } from './particular-risks.component';

describe('ParticularRisksComponent', () => {
  let component: ParticularRisksComponent;
  let fixture: ComponentFixture<ParticularRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticularRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
