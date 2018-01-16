import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Services } from '../_models/Services';
import { URLSearchParams } from '@angular/http';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class ServicesDataService {

    domain: string = 'http://localhost:4000';
    currentUser: JSON;

    constructor(private http: HttpClient) { }


    getDataWithBoth(type: string, service: string) {

        return this.http.get<Services[]>(`${this.domain}/service/${type}/${service}`)
            .map(res => res);
    }

    getDataWithType(type: string) {
        return this.http.get<Services[]>(`${this.domain}/service/${type}`)
            .map(res => res);
    }


}