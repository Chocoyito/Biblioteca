import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-administrar-libro',
  templateUrl: './administrar-libro.component.html',
  styleUrls: ['./administrar-libro.component.scss']
})
export class AdministrarLibroComponent implements OnInit {

  libroForm: FormGroup;
  rutaActual: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()
    this.obtenerRuta()
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
        // Código para agregar un libro
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
