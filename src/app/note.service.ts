import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";

import {Note} from "./note";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class NoteService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private serviceUrl = 'api/notes';

    constructor (private http: Http) {}

    getNote (id: string): Promise<Note> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Note)
            .catch(this.handleError);
    }

    create(note: Note): Promise<Note> {
        return this.http
            .post(this.serviceUrl + "/create", JSON.stringify(note), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Note)
            .catch(this.handleError);
    }

    update(note: Note): Promise<Note> {
        const url = `${this.serviceUrl}/update/${note.id}`;
        return this.http
            .put(url, JSON.stringify(note), {headers: this.headers})
            .toPromise()
            .then(() => note)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
