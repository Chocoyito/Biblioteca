import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from 'src/app/types/libro.type';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  libro: any

  data: Libro[] = [
    { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anoEdicion: 1967, genero: 'Realismo mágico', codigo: 'GGM1001', id: 1 },
    { titulo: '1984', autor: 'George Orwell', anoEdicion: 1949, genero: 'Distopía', codigo: 'GO3001', id: 2 },
    { titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', anoEdicion: 1605, genero: 'Novela', codigo: 'MC4001', id: 3 },
  ]; 

  obtenerListaLibros(){
    return this.data
  }

  guardarLibro(objeto: Libro){
    let id: number = this.data.length + 1
    objeto.id = id
    this.data.push(objeto)
  }

  constructor() { }

  setLibroSeleccionado(objeto: any){
    this.libro = objeto
  }

  getLibroSeleccionado(){
    return this.libro
  }


  url: string = 'http://localhost:3000/libros';

  // guardarLibro(objeto: any): Observable<any>{
  //   return this.http.post(this.url, objeto) 
  // }

  // obtenerListaLibros(): Observable<any>{
  //   return this.http.get(this.url) 
  // }

  // editarLibro(objeto: any): Observable<any>{
  //   return this.http.put(this.url, objeto) 
  // }
}
