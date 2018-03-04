import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactList: Contact[];
  onlyFavorites: boolean = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.fetchContactList(this.onlyFavorites);
  }

  fetchContactList(onlyFavorites: boolean): void {
    this.contactService.getContactList(onlyFavorites).subscribe(data => {
      this.contactList = data;
    });
  }

  toggleView(onlyFavorites: boolean): void {
    this.onlyFavorites = !onlyFavorites;
    this.fetchContactList(this.onlyFavorites);
  }

  handleUpdate(): void {
    this.fetchContactList(this.onlyFavorites);
  }

}
