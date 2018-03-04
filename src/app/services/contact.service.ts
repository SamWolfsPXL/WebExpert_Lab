import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const BASEAPIURL: string = 'https://webexpert1718.firebaseio.com/contacts.json';
const CONTACTAPIURL: string = 'https://webexpert1718.firebaseio.com/contacts/';

@Injectable()
export class ContactService {
  constructor(private httpClient: Http) { }

  getContactList(onlyFavorites: boolean): Observable<Contact[]> {
    return this.httpClient.get(BASEAPIURL)
      .map(response => response.json())
      .map(this.parseContactData)
      .map((contacts: Contact[]) =>{
        return onlyFavorites ? this.filterContacts(contacts) : contacts;
      })
      .catch(this.onError);
  }

  filterContacts(contacts: Contact[]) : Contact[] {
    return contacts.filter(contact => contact.isFavorite);
  }

  parseContactData(rawContacts: any[]): Contact[] {
    return Object.keys(rawContacts).map(key => {
      let contact = rawContacts[key];
      return new Contact(
        contact.name,
        contact.email,
        contact.phone,
        contact.isFavorite,
        contact.avatar,
        key
      );
    });
  }

  onError(response: Response): Observable<any> {
    let error = `Error ${response.status}: ${response.statusText}`;
    console.error(error);
    return Observable.throw(error);
  }

  addContact(contact: Contact): Observable<any> {
    return this.httpClient
      .post(BASEAPIURL, contact)
      .catch(this.onError);
  }

  updateContact(id: string, data: any): Observable<any> {
    let url: string = `${CONTACTAPIURL}${id}.json`;
    return this.httpClient.patch(url, data)
      .catch(this.onError);
  }

  getContact(id: string) {
    let url = `${CONTACTAPIURL}${id}.json`;
    return this.httpClient.get(url)
      .map(response => response.json())
      .map(data => new Contact(data.name, data.email, data.phone, data.isFavorite, data.avatar, id))
      .catch(this.onError);
  }

  deleteContact(id: string) {
    let url = `${CONTACTAPIURL}${id}.json`;
    return this.httpClient.delete(url).catch(this.onError);
  }
}
