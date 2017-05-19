import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared.module';

import { MenuItemComponent } from './menu-item.component';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        // MenuItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.item = {
      name: 'foo',
      title: 'bar'
    };
    expect(component).toBeTruthy();
  });
});
