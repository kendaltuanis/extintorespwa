import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { UserDataService } from '../../core/_services/user-data.service';
import { PersonalData } from '../../core/_models/Personal-Data';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ext-personal',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit, AfterViewChecked {


  phonesData: number[] = [];


  hayTel: Boolean = false;
  display: string = 'none';
  update: boolean = false;


  TempPersonal: JSON;
  personalForm: FormGroup;
  nose: string = "^[a-zA-Zñ]+" + String.fromCharCode(92) + "s'{0,1}[a-zA-Zñ]*";

  results: any;

  personalD: PersonalData;
  phones: FormGroup;
  isEntro: boolean = false;

  constructor(private swUpdate: SwUpdate, private fb: FormBuilder, private userDataService: UserDataService) {

    this.userDataService.getData()
      .subscribe(tasks => {
        this.personalD = tasks;
      });

  }

  ngOnInit() {

    this.createForm();


  }

  ngAfterViewChecked() {
    //  this.personalForm = this.fb.group(new PersonalData());
    //  console.log(this.personalD[0]);

    if (this.personalD !== undefined && !this.isEntro) {
      //console.log("Esto es una prueba");
     // console.log(this.personalD[0].name);
   //   console.log(this.personalD);

      this.personalForm.setValue({
        'name': this.personalD[0].name,
        'flastname': this.personalD[0].flastname,
        'slastname': this.personalD[0].slastname,
        'identification': this.personalD[0].identification,
        'company': this.personalD[0].company,
        'taxname': this.personalD[0].taxname,
      });

      this.phonesData = this.personalD[0].phones as number[];
      this.isEntro = true;

      this.onChanges();

    }

  }


  createForm() {

    this.personalForm = new FormGroup({
      'name': new FormControl('',[Validators.pattern("[a-zA-Z ñ]{3,10}")]),
      'flastname': new FormControl('',[Validators.pattern("[a-zA-Z ñ]{3,10}")]),
      'slastname': new FormControl('',[Validators.pattern("[a-zA-Z ñ]{3,10}")]),
      'identification': new FormControl('',[Validators.required, Validators.minLength(4)]),
      'company': new FormControl('',[Validators.pattern(this.nose)]),
      'taxname': new FormControl('',[Validators.pattern("[a-zA-Z ñ]{3,150}")]),
    });

    this.phones = new FormGroup({
      'countrycode': new FormControl(),
      'phone': new FormControl(),
      'extension': new FormControl(),
    });


  }


  onChanges(): void {

    this.TempPersonal = this.personalForm.value;

    this.personalForm.valueChanges.subscribe(val => {

      if (this.personalForm.status === "VALID") {
        if (JSON.stringify(val) === JSON.stringify(this.TempPersonal)) {
          this.update = false;
          return;
        }
        this.update = true;
        return;
      } else {
        this.update = false;
      }
    });
  }

  updateData(): void{
    this.userDataService.updateData(this.personalForm.value as PersonalData).subscribe(tasks => {
   //  console.log(tasks);

     this.TempPersonal = this.personalForm.value;

     this.update = false;
  });
  }

  addPhone(): void {
    this.phonesData.push(this.phones.value);
  }



}
