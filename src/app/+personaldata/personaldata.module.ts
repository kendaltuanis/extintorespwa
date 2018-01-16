import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { PersonaldataRoutingModule } from './personaldata.routing';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserDataService } from '../core/_services/user-data.service';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    PersonaldataRoutingModule,
    ClarityModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    PersonalDataComponent
  ],
  providers: [UserDataService]
})
export class PersonalDataModule { }