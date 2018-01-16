import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';



@Component({
    selector: 'ext-shell',
    template: `
  <clr-main-container *ngIf="currentUser!=null; else home">
      <ext-navbar></ext-navbar>
  
  <div class="content-container">
      <main class="content-area">
          <router-outlet></router-outlet>
      </main>
      <ext-sidenav class="sidenav" [clr-nav-level]="1"></ext-sidenav>
  </div>
</clr-main-container>

<ng-template #home>
<ext-login></ext-login>
</ng-template>
  `,
    styles: []
})
export class ShellComponent implements OnInit {

    currentUser: any;

    constructor( @Inject(PLATFORM_ID) private platformId: Object) { }
    ngOnInit() {

        if (isPlatformBrowser(this.platformId)) {
            // do client side stuff
            this.currentUser = localStorage.getItem('currentUser');
        }
    }

}
