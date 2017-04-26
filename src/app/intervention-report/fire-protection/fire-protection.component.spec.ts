import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireProtectionComponent } from './fire-protection.component';

describe('FireProtectionComponent', () => {
  let component: FireProtectionComponent;
  let fixture: ComponentFixture<FireProtectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireProtectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
