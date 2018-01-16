import { NgModule }  from '@angular/core';
import { ReportComponent } from './report/report.component';
import { BillingComponent } from './billing/billing.component';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
        path: '', 
        children:[
          {
            path:"reporte",
            component: ReportComponent,
          },
          {
            path:"facturacion",
            component: BillingComponent,
          },
          {
            path:"lista",
            component: ListComponent,
          },

        ]  
      },

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CollaboratorsRoutingModule {}