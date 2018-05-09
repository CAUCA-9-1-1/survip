import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnapsComponent } from './pnaps.component';

describe('PnapsComponent', () => {
  let component: PnapsComponent;
  let fixture: ComponentFixture<PnapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
