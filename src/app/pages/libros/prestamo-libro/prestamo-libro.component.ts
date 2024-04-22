import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LibrosService } from '../libros.service';
import { Libro } from 'src/app/types/libro.type';

@Component({
  selector: 'app-prestamo-libro',
  templateUrl: './prestamo-libro.component.html',
  styleUrls: ['./prestamo-libro.component.scss']
})
export class PrestamoLibroComponent implements OnInit {

  prestamoForm: FormGroup

  libroSeleccionado: Libro = {} as Libro;

  constructor(
    private formBuilder: FormBuilder,
    private librosService: LibrosService
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()

    this.libroSeleccionado = this.librosService.getLibroSeleccionado()

    console.log(this.libroSeleccionado);
    

    if(this.libroSeleccionado){
      this.prestamoForm.get('titulo')?.setValue(this.libroSeleccionado.titulo)
      this.prestamoForm.get('autor')?.setValue(this.libroSeleccionado.autor)
      this.prestamoForm.get('codigo')?.setValue(this.libroSeleccionado.codigo)
      this.prestamoForm.get('fechaPrestamo')?.setValue(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())

      this.prestamoForm.get('titulo')?.disable()
      this.prestamoForm.get('autor')?.disable()
      this.prestamoForm.get('codigo')?.disable()
      this.prestamoForm.get('fechaPrestamo')?.disable()
    }
  }

  initReactiveForm(){
    this.prestamoForm = this.formBuilder.group({
      nombres: [''],
      apellidos: [''],
      cedula: [''],
      fechaPrestamo: [''],
      titulo: [''],
      autor: [''],
      codigo: ['']
    })
  }

  onSubmit(){

  }

  volver(){

  }
}
