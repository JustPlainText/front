import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';


@Component ({
    selector: 'edit-note',
    templateUrl: './edit-note.component.html',
    styleUrls: ['./edit-note.component.css']
})

export class EditNoteComponent implements OnInit {
    note: string;
    id: string;
    private sub: any;

    public constructor(
        private titleService: Title,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.setTitle(params['title']);
            this.id = params['id'];
        })
    }

    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    public encrypt() {
        var encrypted = CryptoJS.AES.encrypt(this.note, this.id);
        console.log(encrypted.toString());

        var decrypted = CryptoJS.AES.decrypt(encrypted, this.id);
        console.log(decrypted.toString(CryptoJS.enc.Utf8));
    }

}
