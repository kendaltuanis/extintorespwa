import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalDataComponent } from './personal-data/personal-data.component';



const routes: Routes = [
  {
        path: '', 
        children:[
          {
            path:"perfil",
            component: PersonalDataComponent,
          },        

        ]  
      },

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PersonaldataRoutingModule {}