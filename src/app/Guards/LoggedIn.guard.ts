import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private routes: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('user') != null) {
        return ;
      } else {
        this.routes.navigate(['/login']);
        return false;
      }
  }

  checkLoggedIn(): boolean {
    return (localStorage.getItem('user') != null);
  }
}
