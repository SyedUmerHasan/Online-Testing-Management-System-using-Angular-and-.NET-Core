import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private routes: Router,
    private authenticationService: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.authenticationService.currentUserValue) {
        // Go to admin Routes
        if (this.authenticationService.isAdmin) {
          this.routes.navigate(['/admin']);
        } else {
        // Go to User Routes
          this.routes.navigate(['/home']);
        }
        return false;
      } else {
        return true;
      }
  }

  checkLoggedIn(): boolean {
    return (this.authenticationService.currentUserValue == null);
  }
}
