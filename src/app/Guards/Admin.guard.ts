import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private routes: Router,
    private authenticationService: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.authenticationService.currentUser && this.authenticationService.currentUserRole)  {
        if (!this.authenticationService.currentUserRole) {
          this.routes.navigate(['/admin/umer']);
          return false;
        }
        return true;
      }
      if (this.authenticationService.currentUser && this.authenticationService.currentUserRole) {
        this.authenticationService.logout();
        window.location.reload();
      } else {
        this.authenticationService.logout();
        this.routes.navigate(['/login']);
        return false;
      }
  }
}
