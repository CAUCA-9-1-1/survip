import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingContactsComponent } from './building-contacts.component';

describe('BuildingContactsComponent', () => {
  let component: BuildingContactsComponent;
  let fixture: ComponentFixture<BuildingContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
