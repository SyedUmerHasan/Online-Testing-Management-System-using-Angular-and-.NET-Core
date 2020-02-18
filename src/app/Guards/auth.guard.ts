import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private routes: Router,
    private authenticationService: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.authenticationService.currentUserValue ) {
        if (this.authenticationService.currentUserRole) {
          this.routes.navigate(['/admin']);
          return false;
        }
        return true;
      } else {
        this.routes.navigate(['/login']);
        return false;
      }
  }
}
