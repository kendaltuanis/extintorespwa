import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { NavbarComponent } from './shell/navbar/navbar.component';
import { SidenavComponent } from './shell/sidenav/sidenav.component';
import { HomeComponent } from './shell/home/home.component';
import { ClarityModule } from "clarity-angular";
import { RouterModule, Routes } from '@angular/router';
import { CoreRoutingModule } from './core.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './_services/auth.guard';
import { AuthenticationService } from './_services/Authentication.service';
import { LoginComponent } from './shell/session/login/login.component';
import { customHttpProvider } from './_helpers/custom-http.service';
import { HttpModule } from '@angular/http';
import { NoCurrencyPipe } from './_helpers/_pipes/no-currency.pipe'; 



@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,                            
    ReactiveFormsModule  ,
    ClarityModule.forRoot(),
    HttpModule
  ],
  declarations: [ShellComponent, NavbarComponent, SidenavComponent, HomeComponent, LoginComponent, NoCurrencyPipe],
  providers: [AuthGuard, AuthenticationService],
  exports: [ShellComponent],
})
export class CoreModule { }
