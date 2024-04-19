import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { LibrosEndpointService } from 'src/app/services/libros-endpoint.service';
import { Libro } from 'src/app/types/libro.type';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  libro: any

  data: Libro[] = []; 

  constructor(
    private librosEndpointService: LibrosEndpointService
  ) { }

  obtenerListaLibros(){
    return this.data
  }

  setLibroSeleccionado(objeto: any){
    this.libro = objeto
  }

  getLibroSeleccionado(){
    return this.libro
  }


  url: string = 'http://localhost:3000/libros';

  
  verLibros(): Observable<any>{
    return this.librosEndpointService.verLibros()
  }

  // guardarLibro(objeto: any): Observable<any>{
  //   return this.librosEndpointService.guardarLibros(objeto) 
  // }

  async guardarLibros(libro: Libro): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.librosEndpointService.guardarLibros(libro)
      );

      return response;
    } catch (error) {
      return error.error;
    }
  }

  async editarLibro(libro: Libro): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.librosEndpointService.editarLibro(libro)
      );

      return response;
    } catch (error) {
      return error.error;
    }
  }

  async eliminarLibro(libro: Libro): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.librosEndpointService.eliminarLibro(libro)
      );

      return response;
    } catch (error) {
      return error.error;
    }
  }

  // obtenerListaLibros(): Observable<any>{
  //   return this.http.get(this.url) 
  // }

  // editarLibro(objeto: any): Observable<any>{
  //   return this.http.put(this.url, objeto) 
  // }
}
