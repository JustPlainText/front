import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import {Observable} from 'rxjs/Rx';
import * as CryptoJS from 'crypto-js';

import {Note} from './note';
import {NoteService} from './note.service';
import {SimpleTimer} from 'ng2-simple-timer';

@Component ({
    selector: 'edit-note',
    templateUrl: './edit-note.component.html',
    styleUrls: ['./edit-note.component.css']
})

export class EditNoteComponent implements OnInit {
    note: Note;
    noteChanged: boolean;

    public constructor(
        private titleService: Title,
        private route: ActivatedRoute,
        private noteService: NoteService,
        private timer: SimpleTimer
    ) { }

    ngOnInit(): void {
      this.note = new Note("", "", "");
      this.route.params
            .switchMap((params: Params) => this.noteService.getNote(params['id']))
            .subscribe(note => {
                this.note = note;
                if (this.note) {
                  this.setTitle(this.note.title)
                }
                else {
                  this.note = new Note("", "", "");
                }
            });
      this.timer.newTimer("saveCronJob", 5);
      this.timer.subscribe("saveCronJob", e => this.saveNote());
    }

    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    public onNoteChange() {
        this.noteChanged = true;
    }

    //TODO change from array to single note after introducing the real backend
    public reload() {
        this.noteService.getNote(this.note.id).then(notes => this.note = notes);
      }

    private saveNote() {
        if (this.noteChanged) {
          console.log("save "  + this.note.id);
            this.noteService.update(this.note);
        }
        this.noteChanged = false;
    }


/*
    public encrypt(value) {
        var encrypted = CryptoJS.AES.encrypt(this.note.text, this.note.id);
        console.log(encrypted.toString());

        var decrypted = CryptoJS.AES.decrypt(encrypted, this.note.id);
        console.log(decrypted.toString(CryptoJS.enc.Utf8));
    }
    */

}
