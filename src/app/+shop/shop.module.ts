import { OrderComponent } from './order/order.component';
import { ShippingComponent } from './shipping/shipping.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { ShopRoutingModule } from './shop.routing';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    ClarityModule.forRoot()
  ],
  declarations: [
  ShippingComponent,
  OrderComponent
]
})
export class ShopModule { }