import { AuthService } from './../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private navCtrl: NavController, private loadCtrl: LoadingController) { }


  async login() {
    const load = await this.loadCtrl.create({message:'Autinticando...'});
    await load.present();
    this.authService.login(this.formLogin.value).then(() => {
      this.navCtrl.navigateRoot('home');
    }).catch(error => {
      console.log(error)
    }).finally(()=>load.dismiss());
    this.formLogin.reset();
  }

}
