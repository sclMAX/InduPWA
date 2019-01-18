import {AuthService} from './../services/auth/auth.service';
import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private authService: AuthService,
              private navCtrl: NavController) {}

  logOut() {
    this.authService.logOut()
        .then(() => this.navCtrl.navigateRoot('login'))
        .catch(console.error);
  }
}
