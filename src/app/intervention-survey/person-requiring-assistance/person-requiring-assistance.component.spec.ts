import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { PersonRequiringAssistanceComponent } from './person-requiring-assistance.component';

describe('PersonRequiringAssistanceComponent', () => {
  let component: PersonRequiringAssistanceComponent;
  let fixture: ComponentFixture<PersonRequiringAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ PersonRequiringAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRequiringAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
