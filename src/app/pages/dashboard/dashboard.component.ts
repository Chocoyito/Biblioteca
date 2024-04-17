import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibrosService } from '../libros/libros.service';
import { Libro } from 'src/app/types/libro.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['titulo', 'autor', 'anoEdicion', 'genero', 'codigo', 'editar', 'visualizar'];

  data: any;

  constructor(private router: Router, private librosService: LibrosService) { }

  ngOnInit(): void {
    // this.data = this.librosService.obtenerListaLibros();
    this.data = this.librosService.verLibros().subscribe(data => {
      console.log(data);
      this.data = data

    }
    )
  }

  editarLibro(element: any) {
    this.librosService.setLibroSeleccionado(element);
    this.router.navigate(['libros/administrar/editar']);
  }

  visualizarLibro(element: any) {
    this.librosService.setLibroSeleccionado(element);
    // console.log(element);

    this.router.navigate(['libros/administrar/visualizar']);
  }
}
