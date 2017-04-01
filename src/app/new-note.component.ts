import { Component } from '@angular/core'
import { Router }   from '@angular/router'
import { UUID } from 'angular2-uuid';


@Component({
    selector: 'new-note',
    templateUrl: './new-note.component.html',
})

export class NewNoteComponent {
    noteTitle : string;

    constructor (private router : Router ) {}

    createNewNote(): void {
        let uuid = UUID.UUID();
        let link = ['/edit', this.noteTitle, uuid];
        this.router.navigate(link);
    }

}
