import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';

@Component ({
    selector: 'edit-note',
    templateUrl: './edit-note.component.html'
})

export class EditNoteComponent implements OnInit {
    note: string;
    private sub: any;

    public constructor(
        private titleService: Title,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.setTitle(params['id']);
        })
    }

    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

}
