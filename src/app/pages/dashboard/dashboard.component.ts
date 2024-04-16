import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['autor', 'anoEdicion', 'genero', 'codigo', 'id', 'editar', 'visualizar'];

  data: any[] = [
    { autor: 'Gabriel García Márquez', anoEdicion: 1967, genero: 'Realismo mágico', codigo: 'GGM1001', id: 1 },
    { autor: 'J.K. Rowling', anoEdicion: 1997, genero: 'Fantasía', codigo: 'JKR2001', id: 2 },
    { autor: 'George Orwell', anoEdicion: 1949, genero: 'Distopía', codigo: 'GO3001', id: 3 },
    { autor: 'Autor 20', anoEdicion: 2000, genero: 'Género 20', codigo: 'COD20', id: 20 }
  ]; constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editarLibro(element: any) {
    this.router.navigate(['libros/administrar/editar']);
  }

  visualizarLibro(element: any) {
    this.router.navigate(['libros/administrar/visualizar']);
  }
}
