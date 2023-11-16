import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('jwt') !== null && localStorage.getItem('jwt') !== undefined && localStorage.getItem('jwt') !== '') {
      return true;
    }

    // Redirect to the login page if the user is not authenticated
    this.router.navigate(['/login']);
    return false;
  }
}
