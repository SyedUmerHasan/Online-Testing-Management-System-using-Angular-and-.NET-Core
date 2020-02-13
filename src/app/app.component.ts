import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/Authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'TestingManagementSystem';
  login = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    ) {
      if (!this.authenticationService.currentUserValue) {
        this.router.navigateByUrl('/login');
      }
   }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

}
