import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireHydrantComponent } from './fire-hydrant.component';

describe('FireHydrantComponent', () => {
  let component: FireHydrantComponent;
  let fixture: ComponentFixture<FireHydrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireHydrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireHydrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
