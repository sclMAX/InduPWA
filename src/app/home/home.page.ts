import { AuthService } from './../services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService){}

  login(email: string, password: string){
    this.authService.login(email, password).then(res => console.log('RESULTADO:',res)).catch(err=>console.log('Error:',err));
  } 
}
