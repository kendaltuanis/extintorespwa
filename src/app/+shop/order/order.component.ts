import { Component, OnInit, ViewChild} from "@angular/core";
import { Wizard } from "clarity-angular";

@Component({
  selector: 'ext-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    typesOfPhones = ['24740780', '57156043', '84173118'];

    @ViewChild("wizardmd") wizardMedium: Wizard;
    @ViewChild("wizardlg") wizardLarge: Wizard;
    @ViewChild("wizardxl") wizardExtraLarge: Wizard;

    mdOpen: boolean = true;
    lgOpen: boolean = false;
    xlOpen: boolean = false;


    users = [
      {producto:"Ext ABC 10lbs Buckeye",estado:"black",creation:'12/07/2016 - Procesado <br> 15/07/2016 - En Camino',color:"Category 4"},
      {producto:"Ext ABC 5lbs Preven",estado:"yellow",creation:'12/07/2016 - Procesado <br> 15/07/2016 - En Camino',color:"Category 4"},
      {producto:"Ext BC 10lbs Amerex",estado:"red",creation:'12/07/2016 - Procesado <br> 15/07/2016 - En Camino',color:"Category 4"},
      {producto:"Ext AFFF 9gl",estado:"green",creation:'12/07/2016 - Procesado <br> 15/07/2016 - En Camino <br> 15/07/2016 - Completado',color:"Category 4"}
    ];
      
    someHtml = `<input type="checkbox" [ngModel]="micronyks"> `;

  constructor() { }

  ngOnInit() {
  }

  open() {
      this.mdOpen= (this.mdOpen) ? false : true;
  }




}
