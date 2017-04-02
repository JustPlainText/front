import { Component } from '@angular/core'
import { Router }   from '@angular/router'
import { UUID } from 'angular2-uuid';

import {Note} from './note';
import {NoteService} from './note.service';


@Component({
    selector: 'new-note',
    templateUrl: './new-note.component.html',
})

export class NewNoteComponent {
    noteTitle : string;

    constructor (
        private router : Router,
        private noteService: NoteService
    ) {}

    createNewNote(): void {
        let id = UUID.UUID();
        let note = new Note(this.noteTitle, id, "text");
        this.noteService.create(note);
        let link = ['/edit', this.noteTitle, id];
        this.router.navigate(link);

    }

}
