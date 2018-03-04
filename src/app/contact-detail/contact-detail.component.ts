import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../services/contact.service';
import {Contact} from '../models/contact.model';
import {EditorState} from '../models/editor-state.enum';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  state: EditorState;
  editorState: any = EditorState;
  id: string;
  contact: Contact;

  constructor(private router: Router, private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getContact(this.id);
  }

  getContact(id: string): void {
    this.contactService.getContact(id).subscribe(data => this.contact = data);
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(this.id, contact).subscribe(() => {
      this.getContact(this.id);
      this.state = EditorState.updated;
      setTimeout(() => this.state = EditorState.null, 3000);
    });
  }

  deleteContact(id: string): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.state = EditorState.deleted;
      setTimeout(() => this.router.navigateByUrl(''), 3000);
    });
  }

  toggleEditing(): void {
    if (this.state === EditorState.null) {
      this.state = EditorState.editing;
    } else {
      this.state = EditorState.null;
    }
  }

}
