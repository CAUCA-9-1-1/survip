import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module.spec';
import { ConnectionTypeComponent } from './connection-type.component';

describe('ConnectionTypeComponent', () => {
  let component: ConnectionTypeComponent;
  let fixture: ComponentFixture<ConnectionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ ConnectionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
