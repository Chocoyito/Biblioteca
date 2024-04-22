import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibrosService } from '../libros/libros.service';
import { Libro } from 'src/app/types/libro.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['titulo', 'autor', 'anoEdicion', 'genero', 'codigo', 'editar', 'visualizar', 'prestar'];

  displayedColumnsInvitado: string[] = ['titulo', 'autor', 'anoEdicion', 'genero', 'codigo',  'visualizar', 'prestar'];


  busquedas: string[] = [
    'Titulo', 'Autor', 'Género'
  ]

  generos: string[] = [
    'Suspenso', 'Romance', 'Accion', 'Ciencia ficcion', 'Terror'
  ]

  data: any;
  originalData: any

  busquedaFormGroup: FormGroup
  valorBusqueda: string

  constructor(
    private router: Router, 
    private librosService: LibrosService,
    private formBuilder: FormBuilder,
    protected appService: AppService

  ) { }

  ngOnInit(): void {

    this.data = this.librosService.verLibros().subscribe(data => {
      this.data = data
      this.originalData = [...data];
    })

    this.initReactiveForm()  
  }

  initReactiveForm() {
    this.busquedaFormGroup = this.formBuilder.group({
      titulo: [''],
      autor: [''],
      genero: [''],
      tipoBusqueda: ['']
    })

    this.busquedaFormGroup.get('tipoBusqueda').valueChanges.subscribe(value => {
      this.busquedaFormGroup.get('titulo').reset();
      this.busquedaFormGroup.get('autor').reset();
      this.busquedaFormGroup.get('genero').reset();
  
      this.valorBusqueda = value;
    });

    this.busquedaFormGroup.get('titulo').valueChanges.subscribe(value => {
      this.filtrarTabla('titulo', value);
    })

    this.busquedaFormGroup.get('autor').valueChanges.subscribe(value => {
      this.filtrarTabla('autor', value);
    })

    this.busquedaFormGroup.get('genero').valueChanges.subscribe(value => {
      this.filtrarTabla('genero', value);
    })
  }

  filtrarTabla(campo: string, valor: string) {
    this.data = [...this.originalData];

    if (valor && this.data) {
      this.data = this.data.filter((libro) => {
        return libro[campo] && libro[campo].toLowerCase().includes(valor.toLowerCase());
      })
    } else {
      this.librosService.verLibros().subscribe(data => {
        this.data = data;
      });
    }
  }

  editarLibro(element: any) {
    this.librosService.setLibroSeleccionado(element);
    this.router.navigate(['libros/administrar/editar']);
  }

  visualizarLibro(element: any) {
    this.librosService.setLibroSeleccionado(element);
    this.router.navigate(['libros/administrar/visualizar']);
  }

  prestarLibro(element: any) {
    this.librosService.setLibroSeleccionado(element);
    this.router.navigate(['libros/prestar']);
  }
}
