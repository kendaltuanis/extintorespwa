import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shell/home/home.component';
import { LoginComponent } from './shell/session/login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { ShellComponent } from './shell/shell.component';


const routes: Routes = [

  
  {
    path: 'iniciar-sesion', component: LoginComponent, canActivate: [AuthGuard]
  },
  {
    path: 'personal', loadChildren: '../+personaldata/personaldata.module#PersonalDataModule', canActivate: [AuthGuard]
  },
  {
    path: 'compras', loadChildren: '../+shop/shop.module#ShopModule', canActivate: [AuthGuard]
  },
  {
    path: 'colaboradores', loadChildren: '../+collaborators/collaborators.module#CollaboratorsModule', canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: '/personal/perfil' // Si no existe alguna dirección entonces redirecciona a HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class CoreRoutingModule { }