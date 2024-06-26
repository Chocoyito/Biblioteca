import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, data: { titulo: 'Inicio Sesión' }
  },
  {
    path: '',
    component: PagesComponent,
    loadChildren: () => import('src/app/pages/pages.module').then(m => m.PagesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
