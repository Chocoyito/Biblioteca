import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from '../libros.service';
import { Libro } from 'src/app/types/libro.type';
import { AdministrarLibroService } from './administrar-libro.service';

@Component({
  selector: 'app-administrar-libro',
  templateUrl: './administrar-libro.component.html',
  styleUrls: ['./administrar-libro.component.scss']
})
export class AdministrarLibroComponent implements OnInit {

  libroForm: FormGroup;
  rutaActual: any;

  libro: Libro = {} as Libro;
  libroSeleccionado: Libro = {} as Libro;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private librosService: LibrosService,
    private administrarLibroService: AdministrarLibroService
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()
    this.obtenerRuta()

    if(this.rutaActual === 'visualizar'){
      this.libroSeleccionado = this.librosService.getLibroSeleccionado()

      console.log(this.libroSeleccionado);
      this.libroForm.get('titulo')?.setValue(this.libroSeleccionado.titulo)
      this.libroForm.get('autor')?.setValue(this.libroSeleccionado.autor)
      this.libroForm.get('anoEdicion')?.setValue(this.libroSeleccionado.anoEdicion)
      this.libroForm.get('genero')?.setValue(this.libroSeleccionado.genero)
      this.libroForm.get('codigo')?.setValue(this.libroSeleccionado.codigo)
      this.libroForm.get('id')?.setValue(this.libroSeleccionado.id)
      
      this.libroForm.disable()
    }
  }

  nombreBoton(){
    return this.rutaActual === 'agregar' ? 'Agregar Libro' : 'Editar libro'
  
  }

  obtenerRuta() {
    // Obtén la última parte de lal ruta
    let rutaCompleta = this.router.url;
    let segmentosDeRuta = rutaCompleta.split('/');
    this.rutaActual = segmentosDeRuta.pop();
    console.log(this.rutaActual);
  }

  initReactiveForm() {
    this.libroForm = this.formBuilder.group({
      titulo: [''],
      autor: [''],
      anoEdicion: [''],
      genero: [''],
      codigo: [''],
      id: ['']
    })
  }

  onSubmit() {

    switch (this.rutaActual) {
      case 'agregar':
        this.libro = {
          titulo: this.libroForm.get('titulo')?.value,
          autor: this.libroForm.get('autor')?.value,
          anoEdicion: this.libroForm.get('anoEdicion')?.value,
          genero: this.libroForm.get('genero')?.value,
          codigo: this.libroForm.get('codigo')?.value,        
        }
        this.administrarLibroService.guardarLibro(this.libro)
        this.router.navigate(['dashboard'])
      break;
      case 'editar':
        // Código para editar un libro
        break;
      default:
        break;
    }
  }

  volver() {
    this.router.navigate(['dashboard'])
  }

}
