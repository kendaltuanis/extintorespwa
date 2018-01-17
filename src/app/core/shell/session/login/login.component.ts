import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../../_services/authentication.service';


@Component({
  selector: 'ext-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  loginForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.createForm();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
      data => {
        this.router.navigate(["/"]);
        location.reload();
      },
      error => {
        this.loading = false;
      });
  }

  createForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl("",[Validators.pattern("[a-zA-Z ñ]{3,10}")]),
      'password': new FormControl("",[Validators.pattern("[a-zA-Z ñ]{3,10}")])
    });
  }




}


