import { Component } from '@angular/core'
import { Router }   from '@angular/router'

@Component({
    selector: 'new-note',
    templateUrl: './new-note.component.html',
})

export class NewNoteComponent {
    noteTitle : string;

    constructor (private router : Router ) {}

    createNewNote(): void {
        let link = ['/edit', this.noteTitle];
        this.router.navigate(link);
    }

}
