import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module.spec';
import { FirehydrantComponent } from './firehydrant.component';

describe('FirehydrantComponent', () => {
  let component: FirehydrantComponent;
  let fixture: ComponentFixture<FirehydrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ FirehydrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirehydrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
