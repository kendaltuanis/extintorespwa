import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';


@Injectable()
export class AuthenticationService {
  constructor( @Inject(PLATFORM_ID) private platformId: Object, private http: Http) { }

  login(email: string, password: string) {
    return this.http.post('/user/signin', { email: email, password: password })
      .map((response: Response) => {
        const user = response.json();
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (isPlatformBrowser(this.platformId)) {
            // do client side stuff
            localStorage.setItem('currentUser', JSON.stringify(user));
          }

        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    if (isPlatformBrowser(this.platformId)) {
      // do client side stuff
      localStorage.removeItem('currentUser');
    }

  }


  
  
}