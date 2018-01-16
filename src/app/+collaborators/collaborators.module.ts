import { ReportComponent } from './report/report.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './billing/billing.component';
import { ClarityModule } from 'clarity-angular';
import { ListComponent } from './list/list.component';
import { CollaboratorsRoutingModule } from './collaborators.routing';
import { BillingService } from '../core/_services/billing.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesDataService } from '../core/_services/services-data.service';
import {CurrencyPipe} from '@angular/common'
import { NoCurrencyPipe } from '../core/_helpers/_pipes/no-currency.pipe';
import { AgmCoreModule } from '@agm/core';
import { GeolocationService } from '../core/_services/geolocation.service';



@NgModule({
  imports: [
    CommonModule,
    CollaboratorsRoutingModule,
    ClarityModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPZIpCuyj6hpV5Ga7InRcQnwV2RhWcQBA'
    })
  ],
  declarations: [
     ReportComponent,
     BillingComponent,
     ListComponent
],
providers: [BillingService,ServicesDataService,CurrencyPipe,NoCurrencyPipe,GeolocationService]
})
export class CollaboratorsModule { }