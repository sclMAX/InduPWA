import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { take, tap, map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private navCtrl: NavController) { }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> |
    Observable<boolean> | boolean {
    console.log('AuthGuard');
    return this.authService.isLogged().then(isLogged => {
      if(!isLogged){
        this.navCtrl.navigateRoot('login');
        return false;
      }
      return true;
    });
   
  }
}
