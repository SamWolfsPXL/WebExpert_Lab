import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormReactComponent } from './contact-form-react.component';

describe('ContactFormReactComponent', () => {
  let component: ContactFormReactComponent;
  let fixture: ComponentFixture<ContactFormReactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactFormReactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
