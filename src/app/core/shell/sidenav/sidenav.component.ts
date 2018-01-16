import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ext-sidenav',
    template: `
  <nav>
  <section class="sidenav-content">
  
  <a routerLink="/" class="nav-link active" id="news"><clr-icon shape="home" size="25"></clr-icon> &nbsp;Ir a Inicio
  </a>
      
      <section class="nav-group">
          <input id="tabexample2" type="checkbox">
          <label for="tabexample2">Datos Personales</label>
          <ul class="nav-list">
              <li [routerLinkActive]="['link-active']">
                  <a class="nav-link" routerLink="/personal/perfil">
                  <clr-icon shape="user" size="20"></clr-icon>&nbsp;Nombre/Empresa</a>
              </li>
              <li [routerLinkActive]="['link-active']">
              <a class="nav-link">
              <clr-icon shape="talk-bubbles" size="20"></clr-icon>&nbsp;Mensajes</a>
          </li>
          </ul>
      </section>
      <section class="nav-group">
          <label for="tabexample2">Compras</label>
          <ul class="nav-list">
              <li [routerLinkActive]="['link-active']">
                  <a class="nav-link" routerLink="/compras/pedidos">
                  <clr-icon shape="bundle" size="20"></clr-icon>&nbsp;Pedidos</a>
              </li>
              <li [routerLinkActive]="['link-active']">
                  <a class="nav-link" routerLink="/compras/direccion-envio">
                  <clr-icon shape="map" size="20"></clr-icon>&nbsp;Dirección Envío</a>
              </li>
          </ul>
      </section>
      <section class="nav-group">
          <label for="tabexample2">Colaboradores</label>
          <ul class="nav-list">
              <li [routerLinkActive]="['link-active']">
                  <a class="nav-link" routerLink="/colaboradores/facturacion">
                  <clr-icon shape="clipboard" size="20"></clr-icon>&nbsp;Facturación</a>
              </li>
              <li [routerLinkActive]="['link-active']">
                  <a class="nav-link" routerLink="/colaboradores/reporte">
                  <clr-icon shape="file-group" size="20"></clr-icon>&nbsp; Reportes</a>
              </li>
              <li [routerLinkActive]="['link-active']">
                  <a class="nav-link" routerLink="/colaboradores/lista">
                  <clr-icon shape="list" size="20"></clr-icon>&nbsp;Listas</a>
              </li>
          </ul>
      </section>
  </section>
</nav>
  `,
    styles: [`
  /* Highlighting rules for nav menu items */
li.link-active a,
li.link-active a:hover,
li.link-active a:focus {
    background-color: #4189C7;
    color: white;
}

  `]
})
export class SidenavComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
