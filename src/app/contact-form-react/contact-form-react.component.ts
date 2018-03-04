import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Contact} from '../models/contact.model';

@Component({
  selector: 'app-contact-form-react',
  templateUrl: './contact-form-react.component.html',
  styleUrls: ['./contact-form-react.component.css']
})
export class ContactFormReactComponent implements OnInit {
  @Input() contact: Contact;
  form: FormGroup;
  @Output() onSubmit: EventEmitter<Contact> = new EventEmitter<Contact>();
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(this.contact ? this.contact.name : null, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(this.contact ? this.contact.email : null, [Validators.required, Validators.pattern(/^[a-z0-9_\.]+@[a-z0-9_\.]+/i)]),
      'phone': new FormControl(this.contact ? this.contact.phone : null, [Validators.required, Validators.minLength(9)]),
      'isFavorite': new FormControl(this.contact ? this.contact.isFavorite : false),
      'avatar': new FormControl(this.contact ? this.contact.avatar : null)
    });
  }

  submit(form): void {
    let contact: Contact = new Contact(
      form.get('name').value,
      form.get('email').value,
      form.get('phone').value,
      form.get('isFavorite').value,
      form.get('avatar').value
    );
    console.log(contact);
    form.reset();
    this.onSubmit.emit(contact);
  }
}
