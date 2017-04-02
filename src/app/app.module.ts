import { BrowserModule, Title} from '@angular/platform-browser';
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
import { SimpleTimer } from "ng2-simple-timer"

@NgModule({
  declarations: [
    AppComponent,
    NewNoteComponent,
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [Title, NoteService, SimpleTimer],
  bootstrap: [AppComponent]
})
export class AppModule { }

