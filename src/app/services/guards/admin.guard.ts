import {AuthService} from './../auth/auth.service';
import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {take, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean>|
      Promise<boolean>| boolean {
    return this.authService.user.pipe(
        take(1), map(user => (user) && (user.role === 'admin')));
  }
}
