import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarLibroComponent } from './administrar-libro/administrar-libro.component';
import { PrestamoLibroComponent } from './prestamo-libro/prestamo-libro.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'administrar', component: AdministrarLibroComponent, children: [
          { path: 'agregar', component: AdministrarLibroComponent },
          { path: 'editar', component: AdministrarLibroComponent },
          { path: 'visualizar', component: AdministrarLibroComponent },
        ]
      },  
      {
        path: 'prestar', component: PrestamoLibroComponent
      },
      
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrosRoutingModuleModule { }
