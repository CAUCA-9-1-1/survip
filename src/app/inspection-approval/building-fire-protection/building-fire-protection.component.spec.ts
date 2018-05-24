import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingFireProtectionComponent } from './building-fire-protection.component';

describe('BuildingFireProtectionComponent', () => {
  let component: BuildingFireProtectionComponent;
  let fixture: ComponentFixture<BuildingFireProtectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingFireProtectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingFireProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
