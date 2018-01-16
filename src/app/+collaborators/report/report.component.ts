import { Component, OnInit, ViewChild} from "@angular/core";
import { Wizard } from "clarity-angular";

@Component({
  selector: 'ext-billing',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    typesOfPhones = ['24740780', '57156043', '84173118'];

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
