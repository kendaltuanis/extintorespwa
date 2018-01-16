import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { PersonalData } from '../_models/Personal-Data';
import { URLSearchParams } from '@angular/http';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class UserDataService {

    domain: string = 'http://localhost:4000';
    currentUser: JSON;

    constructor( @Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }


    getData() {

        if (isPlatformBrowser(this.platformId)) {
            // do client side stuff
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

        return this.http.get<PersonalData>(`${this.domain}/personal/${this.currentUser[0]._id}`)
            .map(res => res);
    }

    updateData(personal: PersonalData) {

        if (isPlatformBrowser(this.platformId)) {
            // do client side stuff
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

        console.log(personal);

        return this.http.put<PersonalData>(`${this.domain}/personal/data/${this.currentUser[0]._id}`, personal)
            .map(res => res);
    }




    getBooksWithPromise() {
        var headers = new Headers();
        return this.http.get("/personal/5a3aec3fe73b544054f0e2b6")
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }



}