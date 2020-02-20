import { AuthenticationService } from './../../../../Services/Authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private location: Location
    ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUser) {
      if (this.authenticationService.currentUserRole === 'SuperAdmin') {
        this.router.navigateByUrl('/admin');
      } else if (this.authenticationService.currentUserRole === 'candidate') {
        this.router.navigateByUrl('/starttest');
      }
    }
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    // this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully logged in');
          console.log('this.returnUrl' , this.returnUrl);
          window.location.reload();
        },
        error => {
            console.log('Not Successfully logged in', error);
            this.loading = false;
        });
  }
}
