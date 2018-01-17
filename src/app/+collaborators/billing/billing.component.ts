import { Component, OnInit, ViewChild, HostListener, PLATFORM_ID, Inject } from "@angular/core";
import { Wizard } from "clarity-angular";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { BillingService } from "../../core/_services/billing.service";
import { Client, InCharge, Phone, Service, Invoice, Discount } from "../../core/_models/Billing";
import { ServicesDataService } from "../../core/_services/services-data.service";
import { Services, Prices } from "../../core/_models/Services";
import { CurrencyPipe, isPlatformBrowser } from '@angular/common'
import { NoCurrencyPipe } from "../../core/_helpers/_pipes/no-currency.pipe";
import { AgmMap, GoogleMapsAPIWrapper, AgmCoreModule } from "@agm/core";
import { GeolocationService } from "../../core/_services/geolocation.service";
import 'rxjs/add/operator/map';
import { google } from "@agm/core/services/google-maps-types";


class IPrices {
  type: string;
  price: number;
}


@Component({
  selector: 'ext-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  phonesData: number[] = [];
  invoicesData: string[] = [];
  servicesTypes: string[] = ["Recarga", "Venta", "Mantenimiento", "Accesorios"];

  @ViewChild("wizardmd") wizardMedium: Wizard;
  @ViewChild("wizardlg") wizardLarge: Wizard;
  @ViewChild("wizardxl") wizardExtraLarge: Wizard;

  mdOpen: boolean = false;
  lgOpen: boolean = false;
  xlOpen: boolean = false;

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };



  personalData: FormGroup;
  phones: FormGroup;
  servicesData: FormGroup;
  discountData: FormGroup;
  cli: Client;
  services: Services[];
  prices;
  tempPrice: number;
  tempCant: number;
  public serviceTemp: any = [];

  creditDays: number;

  public arrayOfKeys;
  public arrayOfKeysPrices;

  public pricesTemp: IPrices[];
  selectedObject: IPrices;
  lat: Number;
  lng: Number;
  coordinates: [{ latitude: Number, longitude: Number }] = [{ latitude: 0, longitude: 0 }];
  positions: any;

  @ViewChild(AgmMap) map: AgmMap;
  @ViewChild(AgmCoreModule) masp: AgmCoreModule;
  
  

  
  @ViewChild(GoogleMapsAPIWrapper) maps: GoogleMapsAPIWrapper;



  resizeMap() {
    this.map.triggerResize();
  }



  constructor(@Inject(PLATFORM_ID) private platformId: Object,private gs: GeolocationService, private fb: FormBuilder, private billingService: BillingService, private servicesService: ServicesDataService, private cp: CurrencyPipe, private cpn: NoCurrencyPipe) {

    
    this.createForm();


  }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // do client side stuff
      this.gs.getLocation().subscribe(rep => {
        // do something with Rep, Rep will have the data you desire.
        console.log();
        this.lat=rep.coords.latitude;
        this.lng=rep.coords.longitude;
      });
      
  }


    /*
      console.log(this.map.latitude);
    console.log(this.map.longitude);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        this.lat=position.coords.latitude;
        this.lng=position.coords.longitude;
      });
    }
*/


  }

  subscribeCurrentPosition() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);

          this.lng = position.coords.longitude;
          this.lat = position.coords.latitude;

        }, (error) => {
          console.log('Geolocation error: ' + error);

        });
    } else {
      console.log("Geolocation not supported in this browse");

    }
  }


  createForm() {

    this.personalData = new FormGroup({
      'taxname': new FormControl(),
      'identification': new FormControl(),
      'company': new FormControl(),
      'userInCharge': new FormGroup({
        'name': new FormControl(),
        'flastname': new FormControl(),
        'slastname': new FormControl(),
        'position': new FormControl()
      })
    });

    this.phones = new FormGroup({
      'countrycode': new FormControl('506'),
      'phone': new FormControl(),
      'extension': new FormControl(),
    });

    this.discountData = new FormGroup({
      'discount': new FormControl(),
      'percentage': new FormControl()
    });





  }

  addInvoice(): void {
    this.cli = new Client();
    this.cli.taxname = this.personalData.value.taxname;
    this.cli.company = this.personalData.value.company;
    this.cli.identification = this.personalData.value.identification;


    var invoice: Invoice = new Invoice();
    invoice.incharge = this.personalData.value.userInCharge;
    invoice.discount = this.discountData.value as Discount;
    invoice.total = this.getSum();
    invoice.credittime = this.creditDays;
    console.log(this.creditDays);


    this.cli.invoices = invoice;


    this.cli.invoices.phones = this.phonesData as Phone;
    this.cli.invoices.services = this.serviceTemp as Service;

    console.log(this.cli);

    console.log(JSON.parse(JSON.stringify(this.cli)));


    //this.billingService.addData(this.cli);

  }


  addPhone(): void {
    this.phonesData.push(this.phones.value);
  }


  onChange(type: string, selectServices, selectPrices): void {
    this.servicesService.getDataWithType(type)
      .subscribe(tasks => {
        this.arrayOfKeys = Object.keys(tasks);
        this.services = tasks;
      });

    selectServices.value = 'noption';
    selectPrices.value = 'noption';

  }

  onChangeService(service: string, type: string, selectPrices): void {
    this.services.forEach(element => {
      if (element.service == service && element.type == type) {

        this.pricesTemp = [
          { type: "A", price: element.prices[0].classA },
          { type: "B", price: element.prices[0].classB },
          { type: "C", price: element.prices[0].classC },
          { type: "D", price: element.prices[0].classD }
        ];

        selectPrices.value = { type: "C", price: element.prices[0].classC };
      }
    });



  }

  addService(selectCant: number, selectType: string, selectServices: string, selectPrices): void {

    var isEntro: Boolean = false;


    var selectedPrice = JSON.parse(selectPrices)["price"];
    var typePrice = JSON.parse(selectPrices)["type"];



    if (this.serviceTemp != undefined) {

      this.serviceTemp.forEach(element => {

        if (element[0].service == selectServices && element[0].typeservice == selectType) {
          this.tempCant = Number(element[0].quantity) + Number(selectCant);

          this.tempPrice = element[0].unitprice + (selectCant * Number(selectedPrice));

          element[0].unitprice = this.tempPrice;
          element[0].quantity = this.tempCant;
          isEntro = true;
          return;
        }

      });
    }



    if (!isEntro) {
      this.tempPrice = selectCant * Number(selectedPrice);
      this.serviceTemp.push(
        [{ quantity: selectCant, typeservice: selectType, service: selectServices, unitprice: this.tempPrice, typeprice: typePrice }]
      );

    }


  }



  clickBlock(value: HTMLElement): void {
    console.log(value.textContent);
    console.log(value.innerText);



  }

  getSum(): number {

    var temp: number = 0;

    this.serviceTemp.forEach(element => {
      temp += element[0].unitprice;
    });

    return temp;
  }

  getSumWithDiscount(): number {

    var temp: number = 0;
    var inputPercentage: number = this.cpn.transform(this.discountData.value.discount);

    this.serviceTemp.forEach(element => {
      temp += element[0].unitprice;
    });

    if (inputPercentage > 0) {
      temp -= inputPercentage;
    }


    return temp;
  }

  onChangePercentage(): void {

    var inputPercentage: number = this.discountData.value.percentage;

    var temp = "0.";
    var total = this.getSum();

    if (inputPercentage < 10) {
      temp = "0.0";
    }
    temp += inputPercentage.toString();


    var nose = total * parseFloat(temp);


    this.discountData.setValue({
      'discount': this.cp.transform(nose, 'CRC', 'symbol-narrow', '1.2-2'),
      'percentage': inputPercentage
    });



  }















  open() {
    this.mdOpen = (this.mdOpen) ? false : true;
  }




}
