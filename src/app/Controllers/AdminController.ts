import { AuthenticationService } from './../Services/Authentication/authentication.service';
import { Router } from '@angular/router';

export class AdminController {
  private router: Router;
  private authenticationService: AuthenticationService;
  constructor() {
        console.log('I am umer ');
        if (this.authenticationService.currentUserValue) {
        }
    }

}
