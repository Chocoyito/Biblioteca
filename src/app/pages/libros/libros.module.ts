import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { AdministrarLibroComponent } from './administrar-libro/administrar-libro.component';
import { LibrosRoutingModuleModule } from './libros-routing-module.module';
import { PrestamoLibroComponent } from './prestamo-libro/prestamo-libro.component';


@NgModule({
  declarations: [
    AdministrarLibroComponent,
    PrestamoLibroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    LibrosRoutingModuleModule,
    
  ]
})
export class LibrosModule { }
