import {AdminGuard} from './services/guards/admin.guard';
import {HomeGuard} from './services/guards/home.guard';
import {LoginGuard} from './services/guards/login.guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './services/auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard, HomeGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin-routing.module#AdminRoutingModule', canActivate: [AuthGuard]
  },

  {path: '**', redirectTo: 'home', pathMatch: 'full'},

];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {
}
