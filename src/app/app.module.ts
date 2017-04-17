import { BrowserModule, Title} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { NewNoteComponent } from './new-note.component';
import { EditNoteComponent } from './edit-note.component';
import { NoteService } from './note.service';
import { PasswordService } from './password.service';
import { SimpleTimer } from "ng2-simple-timer"

import { environment } from '../environments/environment';

import {ButtonModule} from 'primeng/primeng';
import {EditorModule,SharedModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';

import {BusyModule} from 'angular2-busy';

@NgModule({
  declarations: [
    AppComponent,
    NewNoteComponent,
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    environment.memDb ? InMemoryWebApiModule.forRoot(InMemoryDataService) : [],
    ButtonModule,
    EditorModule,
    SharedModule,
    DialogModule,
    BusyModule
  ],
  providers: [Title, NoteService, PasswordService, SimpleTimer],
  bootstrap: [AppComponent]
})
export class AppModule { }
