import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Client } from '../_models/Billing';
import { URLSearchParams } from '@angular/http';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class BillingService {

    domain: string = 'http://localhost:4000';
    currentUser: JSON;

    constructor( @Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }


    addData(client: Client) {

        if (isPlatformBrowser(this.platformId)) {
            // do client side stuff
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

        console.log(client);

        return this.http.put<Client>(`${this.domain}/billing`, client)
            .map(res => res);
    }


}