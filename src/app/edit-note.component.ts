import 'rxjs/add/operator/switchMap';
import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';

import {Note} from './note';
import {NoteService} from './note.service';
import {PasswordService} from './password.service';
import {SimpleTimer} from 'ng2-simple-timer';

@Component ({
  selector: 'edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})

export class EditNoteComponent implements AfterViewInit {
  note: Note = new Note();
  noteText: string = "";
  noteChanged: boolean;
  noteSaved: boolean;
  password: string;
  showSaveErrorMessage: boolean;
  showWrongPasswordMessage: boolean;
  showPasswordDialog: boolean;

  public constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private noteService: NoteService,
    private passwordService: PasswordService,
    private timer: SimpleTimer
  ) { }

  ngAfterViewInit(): void {
    this.route.params
          .switchMap((params: Params) => this.noteService.getNote(params['id']))
          .subscribe(note => {
            this.note = note;
            this.noteText = this.note.text;
            this.setTitle(this.note.title);
            this.checkNotePassword();
          });
    this.startSaveCronJob();
  }

  public startSaveCronJob() {
    this.timer.newTimer("saveCronJob", 5);
    this.timer.subscribe("saveCronJob", e => this.saveNote());
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  public onNoteChange() {
    this.noteChanged = true;
    this.noteSaved = false;
  }

  public enterPassword() {
    this.noteText = this.decrypt();
    if (!this.noteText) {
      this.showWrongPasswordMessage = true;
    }
    else {
      this.showPasswordDialog = false;
      this.showWrongPasswordMessage = false;
    }
  }

  private checkNotePassword() {
    if (this.note.password) {
      if (this.passwordService.password) {
        this.password = this.passwordService.password;
      }
      else {
        this.showPasswordDialog = true;
      }
    }
  }

  public saveNote() {
    if (this.noteChanged) {
      console.log("save "  + this.note.id);
      this.note.text = this.password ? this.encrypt() : this.noteText;
      this.noteService.update(this.note).then(
        (note) => {
          this.noteSaved = true;
          this.showSaveErrorMessage = false;
      }, (error) => {
        this.showSaveErrorMessage = true;
      });
    }
    this.noteChanged = false;
  }

  private encrypt(): string {
    let encryptedText = CryptoJS.AES.encrypt(this.noteText, this.password).toString();
    return encryptedText;
  }

  private decrypt() {
    let decryptedText;
    try {
      decryptedText = CryptoJS.AES.decrypt(this.note.text, this.password)
        .toString(CryptoJS.enc.Utf8);
    }
    catch(e) {
      decryptedText = "";
    }
    return decryptedText;
  }

}
