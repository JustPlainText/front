import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";

import {Note} from "./note";

import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';

@Injectable()
export class NoteService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private serviceUrl = 'api/notes';

    constructor (private http: Http) {}

    getNote (id: string): Promise<Note> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response){
      let note = (environment.memDb ? res.json().data : res.json()) as Note
      return note;
    }

    create(note: Note): Promise<Note> {
        return this.http
            .post(this.serviceUrl + "/", JSON.stringify(note), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Note)
            .catch(this.handleError);
    }

    update(note: Note): Promise<Note> {
        const url = `${this.serviceUrl}/${note.id}`;
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
