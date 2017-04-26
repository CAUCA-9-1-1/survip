import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerousMaterialComponent } from './dangerous-material.component';

describe('DangerousMaterialComponent', () => {
  let component: DangerousMaterialComponent;
  let fixture: ComponentFixture<DangerousMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangerousMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangerousMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
