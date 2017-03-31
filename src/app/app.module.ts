import { BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NewNoteComponent } from './new-note.component';
import { EditNoteComponent } from './edit-note.component';

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
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }

