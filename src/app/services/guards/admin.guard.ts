import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) { }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |
    Promise<boolean> | boolean {
    console.log('AdminGuard');
    return this.authService.hasRole('admin').then(res => {
      console.log('HasAdmin', res);
      return res;
    })
  }
}
