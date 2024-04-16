import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { AgregarComponent } from './agregar/agregar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { LibrosRoutingModuleModule } from './libros-routing-module.module';



@NgModule({
  declarations: [AgregarComponent, VisualizarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    LibrosRoutingModuleModule
  ]
})
export class LibrosModule { }
