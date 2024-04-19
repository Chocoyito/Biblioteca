import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { AdministrarLibroComponent } from './administrar-libro/administrar-libro.component';
import { LibrosRoutingModuleModule } from './libros-routing-module.module';
import { BusquedaLibrosComponent } from './busqueda-libros/busqueda-libros.component';



@NgModule({
  declarations: [
    AdministrarLibroComponent,
    BusquedaLibrosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    LibrosRoutingModuleModule,
    
  ]
})
export class LibrosModule { }
