import { AuthGuard } from './../services/auth/auth.guard';
import {AdminGuard} from './../services/guards/admin.guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'add-perfil',
    loadChildren: './perfiles/add-perfil/add-perfil.module#AddPerfilPageModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'usuarios',
    loadChildren: './usuarios/usuarios/usuarios.module#UsuariosPageModule',
    canActivate: [AuthGuard, AdminGuard]
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},

];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class AdminRoutingModule {
}
