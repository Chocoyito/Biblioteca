import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { EndpointService } from 'src/app/services/endpoint.service';
import { Libro } from 'src/app/types/libro.type';
import { Persona } from 'src/app/types/persona.type';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  libro: any

  data: Libro[] = []; 

  constructor(
    private endpointService: EndpointService
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

  verLibros(): Observable<any>{
    return this.endpointService.verLibros()
  }

  // guardarLibro(objeto: any): Observable<any>{
  //   return this.endpointService.guardarLibros(objeto) 
  // }

  async guardarLibros(libro: Libro): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.endpointService.guardarLibros(libro)
      );

      return response;
    } catch (error) {
      return error.error;
    }
  }

  async prestarLibro( persona: Persona, libro: Libro,): Promise<any> {
    try {
      console.log(`ID DE LIBRO MIERDA${libro.codigo}`);

      const response = await firstValueFrom(
        this.endpointService.registrarPrestamo(persona, libro)
      );

      return response;
    } catch (error) {
      return error.error;
    }
  }


  async editarLibro(libro: Libro): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.endpointService.editarLibro(libro)
      );

      return response;
    } catch (error) {
      return error.error;
    }
  }

  async eliminarLibro(libro: Libro): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.endpointService.eliminarLibro(libro)
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
