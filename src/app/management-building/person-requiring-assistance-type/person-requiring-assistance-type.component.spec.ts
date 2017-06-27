import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module';
import {PersonRequiringAssistanceTypeComponent} from './person-requiring-assistance-type.component';

describe('PersonRequiringAssistanceTypeComponent', () => {
  let component: PersonRequiringAssistanceTypeComponent;
  let fixture: ComponentFixture<PersonRequiringAssistanceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ PersonRequiringAssistanceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRequiringAssistanceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
