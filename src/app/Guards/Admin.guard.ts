import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private routes: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('admin') != null) {
        return true;
      } else {
        this.routes.navigate(['/signup']);
        return false;
      }
  }
}
