import { Component } from '@angular/core'
import { Router }   from '@angular/router'
import { UUID } from 'angular2-uuid';

import {Note} from './note';
import {NoteService} from './note.service';
import {PasswordService} from './password.service';


@Component({
  selector: 'new-note',
  templateUrl: './new-note.component.html'
})

export class NewNoteComponent {
  note: Note = new Note();
  password: string;
  busy: Promise<any>;

  constructor (
    private router : Router,
    private noteService: NoteService,
    private passwordService: PasswordService
  ) { }

  createNewNote(): void {
    if (this.password) {
      this.note.encrypted = true;
      this.passwordService.password = this.password;
    }
    let id = UUID.UUID();
    this.note.id = id;
    this.busy = this.noteService.create(this.note).then(note =>
      {
        let link = ['/edit', this.note.title, id];
        this.router.navigate(link);
      });
  }
}
