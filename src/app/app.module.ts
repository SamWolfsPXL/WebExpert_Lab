import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContactComponent} from './contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactFormReactComponent } from './contact-form-react/contact-form-react.component';
import {ContactService} from './services/contact.service';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactFormComponent,
    ContactFormReactComponent,
    ContactListComponent,
    AddContactComponent,
    ContactDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
