import { AuthenticationService } from './../../../../Services/Authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetpasswordForm: FormGroup;
  order: string;
  email = '';
  token = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      // Go to admin Routes
      if (this.authenticationService.currentUserRole === 'SuperAdmin') {
        this.router.navigate(['/admin']);
      } else if (this.authenticationService.currentUserRole === 'candidate') {
        // Go to User Routes
        this.router.navigateByUrl('/candidate');
      } else if (this.authenticationService.currentUserRole === 'user') {
      // Go to User Routes
      }
    }
  }




  ngOnInit() {
    this.resetpasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.route.queryParams
    .subscribe(params => {
      if (params.email && params.token) {
        this.email = params.email;
        this.token = params.token;
      } else {
        this.router.navigate(['forgotpassword']);
      }
    });


  }

  get f() { return this.resetpasswordForm.controls; }

  onSubmit() {

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    // this.loading = true;
    this.authenticationService.resetpassword(this.email, this.token, this.f.password.value, this.f.confirmPassword.value )
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully logged in');
        },
        error => {
            console.log('Not Successfully logged in', error);
        });
  }


}
