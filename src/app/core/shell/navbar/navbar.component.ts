import { Component, OnInit, style } from '@angular/core';

@Component({
  selector: 'ext-navbar',
  template: `
  <clr-header>
  <div class="branding">
      <a href="..." class="nav-link">
          <img src="../../../../assets/logo.png" alt="logo-extintores" height="35px" style="margin-right: 5px;">
          <span class="title" style="position: absolute;margin-left: 40px;">Extintores Universales</span>
      </a>
  </div>
  <div class="header-nav" [clr-nav-level]="2" style="margin-left:50px;">
      <div *ngIf="colaborador; then colaboradores else clientes"></div>

      <ng-template #colaboradores><a routerLink="/facturacion" *ngFor="let item of itemsFactu" class="nav-link nav-text">{{item}}</a></ng-template>
      <ng-template #clientes><a href="javascript://" *ngFor="let item of itemsCompras" class="nav-link nav-text">{{item}}</a></ng-template>

  </div>
</clr-header>
  `,
  styles: []
})
export class NavbarComponent implements OnInit {

  colaborador: boolean = true;
  itemsFactu:string[]=['ABC-2.2Lbs','ABC-5Lbs','ABC-10Lbs','ABC-20Lbs','MAN-BC' ];
  itemsCompras:string[]=['Compras','Descuentos','Promociones','Pedir Recarga'];

  constructor() { }

  ngOnInit() {
  }

}
