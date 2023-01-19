import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/service/auth/auth.guard';
import { SubirArchivosComponent } from './pages/subir-archivos/subir-archivos.component';
import { DataTableComponent } from './pages/data-table/data-table.component';
import {DetailComponent} from './detail/detail.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard],
    // data:{roles:[Role.GCI_Login, Role.C36_SIMULATOR]},
  },
  {
    path: 'subir-archivos',
    component: SubirArchivosComponent,
  },
  {
    path: 'data-table',
    component: DataTableComponent,
  },
  {
    path: 'details',
    component: DetailComponent,
  },
  { path: '**', redirectTo: '/login' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
