import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShippingComponent } from './shipping/shipping.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
        path: '', 
        children:[
          {
            path:"direccion-envio",
            component: ShippingComponent,
          },
          {
            path:"pedidos",
            component: OrderComponent,
          },

        ]  
      },

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class ShopRoutingModule {}