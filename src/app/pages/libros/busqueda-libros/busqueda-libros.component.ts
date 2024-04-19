import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../libros.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Libro } from 'src/app/types/libro.type';

@Component({
  selector: 'app-busqueda-libros',
  templateUrl: './busqueda-libros.component.html',
  styleUrls: ['./busqueda-libros.component.scss']
})
export class BusquedaLibrosComponent implements OnInit {

  data: any
  originalData: any

  generos: string[] = [
    'Suspenso', 'Romance', 'Accion', 'Ciencia ficcion', 'Terror'
  ]

  displayedColumns: string[] = [
    'titulo', 'autor', 'anoEdicion', 'genero', 'codigo', 'editar', 'visualizar'
  ];

  busquedas: string[] = [
    'Titulo', 'Autor', 'Género'
  ]

  busquedaFormGroup: FormGroup
  valorBusqueda: string

  constructor(
    private librosService: LibrosService,
    private router: Router,
    private formBuilder: FormBuilder
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
}
