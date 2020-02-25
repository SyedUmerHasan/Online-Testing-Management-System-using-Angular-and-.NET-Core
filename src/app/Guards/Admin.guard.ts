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
      // if (this.authenticationService.currentUser && this.authenticationService.currentUserRole)  {
      //   if (!this.authenticationService.currentUserRole) {
      //     return false;
      //   }
      //   return true;
      // }
      // if (this.authenticationService.currentUser && this.authenticationService.currentUserRole) {
      //   this.authenticationService.logout();
      //   window.location.reload();
      // } else {
      //   this.authenticationService.logout();
      //   this.routes.navigate(['/login']);
      //   return false;
      // }
      if (this.authenticationService.currentUserValue) {
        // Go to admin Routes
        if (this.authenticationService.currentUserRole === 'SuperAdmin') {
          console.log('Admin Guard SuperAdmin');
          return true;
        } else if (this.authenticationService.currentUserRole === 'candidate') {
          // Go to User Routes
          if (localStorage.getItem('allow') === 'true') {
            console.log('Allow true');
            this.routes.navigate(['candidate']);
            return false;
          } else {
            console.log('Admin Guard candidate');
          }
          this.authenticationService.logout();
          localStorage.setItem('flag', 'true');
          window.location.reload();
          return false;
        } else if (this.authenticationService.currentUserRole === 'user') {
          // Go to User Routes
          // localStorage.setItem('flag', 'true');
          // this.authenticationService.logout();
          // window.location.reload();
          console.log('Admin Guard user');
          return false;
        }
        return true;
      } else {
        return false;
      }
  }
}
