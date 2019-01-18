import {AuthService} from './../auth/auth.service';
import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {take, map, tap} from 'rxjs/operators';
import {NavController} from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class HomeGuard implements CanActivate {
  constructor(private authService: AuthService,
              private navCtrl: NavController) {}
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean>|
      Promise<boolean>| boolean {
    return this.authService.user.pipe(
        take(1), map(user => {
          if (!user || !user.role) {
            console.error('Usuario no logeado o sin roles!');
            return false;
          }
          this.navCtrl.navigateRoot(user.role);
          return true;
        }));
  }
}
