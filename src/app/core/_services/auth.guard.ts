import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

  urlLogin: string = '/iniciar-sesion';
  currentUser: any;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = localStorage.getItem('currentUser');
    }

    if (this.currentUser) {
      if (state.url === this.urlLogin) {
        this.router.navigate([this.router.url]);
      }
      return true;
    }

    if (state.url === this.urlLogin) {
      return true;
    }

    this.router.navigate([this.urlLogin]);
    return false;
  }
}