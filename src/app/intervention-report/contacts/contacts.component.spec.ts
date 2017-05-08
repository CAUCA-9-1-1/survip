import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http } from '@angular/http';

import {
  IgoModule,
  LanguageLoader,
  provideLanguageService
} from 'igo2';

// import { TestModule } from '../../test.module';
import { ContactsComponent } from './contacts.component';
import { ContactService } from '../shared/contact.service';

export function translateLoader(http: Http) {
  return new LanguageLoader(http, './assets/locale/', '.json');
}

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IgoModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [ ContactsComponent ],
      providers: [
        ContactService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
