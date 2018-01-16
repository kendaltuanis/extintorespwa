import { Component, OnInit, ViewChild} from "@angular/core";
import { Wizard } from "clarity-angular";

@Component({
  selector: 'ext-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
    typesOfPhones = ['24740780', '57156043', '84173118'];
  //  users = { id:{ "hola" }, name:{"Kendall"}, creation:{"57156043" },color:{"blue"} }; 

  users = [
    {cp:"21004",gps:"MAPA",creation:"Alajuela, San Carlos, Quesada, centro detrás de la iglesia católica",color:"Category 4"},
    {cp:"21005",gps:"MAPA",creation:"Alajuela, San Carlos, Palmera, Santa Rosa, 150mts norte y 100 oeste de la iglesia católica",color:"Category 4"},
    {cp:"21010",gps:"MAPA",creation:"Alajuela, San Carlos, Quesada, centro detrás de la iglesia católica",color:"Category 4"},
    {cp:"21007",gps:"MAPA",creation:"Alajuela, San Carlos, Palmera, Santa Rosa, 150mts norte y 100 oeste de la iglesia católica",color:"Category 4"}
  ];
    
    

    @ViewChild("wizardmd") wizardMedium: Wizard;
    @ViewChild("wizardlg") wizardLarge: Wizard;
    @ViewChild("wizardxl") wizardExtraLarge: Wizard;

    mdOpen: boolean = true;
    lgOpen: boolean = false;
    xlOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  open() {
      this.mdOpen= (this.mdOpen) ? false : true;
  }




}
