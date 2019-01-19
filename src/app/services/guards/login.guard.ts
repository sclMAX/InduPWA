import { NavController } from '@ionic/angular';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private navCtrl:NavController) { }
 canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Promise<boolean>  {
    return  this.authService.isLogged().then(res => {
      if (res) {
        this.navCtrl.navigateForward('home');
        return false;
      }
      return true;
    });
  }
}
