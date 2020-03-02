import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private location: Location) {   
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
    this.forgotpasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  get f() { return this.forgotpasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    // this.loading = true;
    this.authenticationService.forgotpassword(this.f.email.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully logged in');
          console.log('this.returnUrl' , this.returnUrl);
          this.router.navigate(['/resetpassword'])
        },
        error => {
            console.log('Not Successfully logged in', error);
            this.loading = false;
        });
  }

}
