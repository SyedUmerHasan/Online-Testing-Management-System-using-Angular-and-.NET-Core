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
  login = '';


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    ) {
      // if (this.authenticationService.currentUser != null) {
      //   if (!this.authenticationService.currentUserRole) {
      //     this.router.navigateByUrl('/login');
      //   }
      // }
   }

  ngOnInit() {
    if (this.authenticationService.currentUser != null) {
      // currentUser exist in Localstorage
      if (this.authenticationService.currentUserRole === 'SuperAdmin') {
        this.login = 'SuperAdmin';
      } else if (this.authenticationService.currentUserRole === 'candidate') {
        this.login = 'candidate';
      } else {
        this.login = 'user';
      }
      // currentUser exist in Localstorage
      // this.login = this.authenticationService.currentUserRole;
    } else {
      this.authenticationService.logout();
      window.location.reload();
    }
  }

}
