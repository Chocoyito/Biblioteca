import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from '../libros.service';
import { Libro } from 'src/app/types/libro.type';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-administrar-libro',
  templateUrl: './administrar-libro.component.html',
  styleUrls: ['./administrar-libro.component.scss']
})
export class AdministrarLibroComponent implements OnInit {

  libroForm: FormGroup;
  rutaActual: any;

  regexSoloNumeros = '^[0-9]*$';

  libro: Libro = {} as Libro;
  libroSeleccionado: Libro = {} as Libro;
  invitado: boolean;


  generos: string[] = [
    'Suspenso', 'Romance', 'Acción', 'Terror', 'Ficción', 'Distopía', 'Novela', 'Fantasía', 'Misterio'  
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private librosService: LibrosService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()
    this.obtenerRuta()
    this.invitado = this.appService.invitado;


    if(this.rutaActual === 'visualizar'){
      this.appService.setTitulo('Visualizar Libro')
      this.libroSeleccionado = this.librosService.getLibroSeleccionado()

      // console.log(this.libroSeleccionado);
      this.libroForm.get('id')?.setValue(this.libroSeleccionado.idLibro)
      this.libroForm.get('titulo')?.setValue(this.libroSeleccionado.titulo)
      this.libroForm.get('autor')?.setValue(this.libroSeleccionado.autor)
      this.libroForm.get('anoEdicion')?.setValue(this.libroSeleccionado.anioEdicion)
      this.libroForm.get('genero')?.setValue(this.libroSeleccionado.genero)
      this.libroForm.get('codigo')?.setValue(this.libroSeleccionado.codigo)
      
      this.libroForm.disable()
    }
    else if (this.rutaActual === 'editar') {
      this.appService.setTitulo('Editar Libro')
      this.libroSeleccionado = this.librosService.getLibroSeleccionado()
      this.libroForm.get('id')?.setValue(this.libroSeleccionado.idLibro)
      this.libroForm.get('titulo')?.setValue(this.libroSeleccionado.titulo)
      this.libroForm.get('autor')?.setValue(this.libroSeleccionado.autor)
      this.libroForm.get('anoEdicion')?.setValue(this.libroSeleccionado.anioEdicion)
      this.libroForm.get('genero')?.setValue(this.libroSeleccionado.genero)
      this.libroForm.get('codigo')?.setValue(this.libroSeleccionado.codigo)
    }
    else {
      this.appService.setTitulo('Agregar Libro')
    }
  }

  initReactiveForm() {
    this.libroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anoEdicion: ['', Validators.required],
      genero: ['', Validators.required],
      codigo: [''],
      id: ['']
    })
  }

  nombreBoton(){
    return this.rutaActual === 'agregar' ? 'Agregar Libro' : this.rutaActual === 'visualizar' ? 'Dar de baja' : 'Editar libro'
  }

  obtenerRuta() {
    // Obtén la última parte de lal ruta
    let rutaCompleta = this.router.url;
    let segmentosDeRuta = rutaCompleta.split('/');
    this.rutaActual = segmentosDeRuta.pop();
    console.log(this.rutaActual);
  }

  procesarDatos(){
    return new Promise<any>(resolve => {
      this.libro = {
        titulo: this.libroForm.get('titulo')?.value,
        autor: this.libroForm.get('autor')?.value,
        anioEdicion: this.libroForm.get('anoEdicion')?.value,
        genero: this.libroForm.get('genero')?.value,
        codigo: this.libroForm.get('codigo')?.value,        
      }
      this.librosService.guardarLibros(this.libro).then(result => {
        this.router.navigate(['dashboard'])
        resolve(result)
      })
    })
  }

  rellenarLibro(){
    return new Promise<any>(resolve => {
      this.libro = {
        titulo: this.libroForm.get('titulo')?.value,
        autor: this.libroForm.get('autor')?.value,
        anioEdicion: this.libroForm.get('anoEdicion')?.value,
        genero: this.libroForm.get('genero')?.value,
        codigo: this.libroForm.get('codigo')?.value,
        idLibro: this.libroForm.get('id')?.value        
      }
      if (this.rutaActual === 'visualizar'){
        this.librosService.eliminarLibro(this.libroSeleccionado).then(result => {
          this.router.navigate(['dashboard'])

          resolve(result)
        })
      } else{
        this.librosService.editarLibro(this.libro).then(result => {
          this.router.navigate(['dashboard'])
          resolve(result)
        })
      }
    })
  }

  onSubmit() {
    switch (this.rutaActual) {
      case 'agregar':
        this.procesarDatos()
       break;
      case 'editar':
        this.rellenarLibro()
      break;
      case 'visualizar':
        this.rellenarLibro()
      break;
    }
  }

  volver() {
    this.router.navigate(['dashboard'])
  }
}
