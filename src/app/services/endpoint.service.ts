import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../types/libro.type';
import { Usuario } from '../types/usuario.type';
import { Persona } from '../types/persona.type';
import { Multa } from '../types/multa.type';


@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor(
    private http: HttpClient
  ) { }

  urlLibro: string = 'http://192.168.1.78:8080/book/';
  urlUsuario: string = 'http://192.168.1.78:8080/';


  urlMulta: string = 'http://192.168.1.78:8080/latefee/';

  urlPersona: string = 'http://192.168.1.78:8080/person/';


  verLibros() : Observable<any>{
    return this.http.get(`${this.urlLibro}list`)
  }

  guardarLibros(obj: Libro) : Observable<any>{
    return this.http.post(`${this.urlLibro}add`, obj)
  }

  editarLibro(obj: Libro) : Observable<any>{  
    return this.http.put(`${this.urlLibro}edit/${obj.idLibro}`, obj)
  }

  eliminarLibro(obj: Libro) : Observable<any>{
    return this.http.put(`${this.urlLibro}delete/${obj.idLibro}`, obj)
  }

  verPredev() : Observable<any>{
    return this.http.get(`${this.urlLibro}listPreDev`)
  }

  iniciarSesion(obj: Usuario) : Observable<any>{
     return this.http.get(`${this.urlUsuario}login?user=${obj.usuario}&password=${obj.contrasena}`)
  }
  
  registrarPrestamo( persona: Persona, obj: Libro,) : Observable<any>{
    return this.http.post(`${this.urlPersona}${obj.codigo}/BorrowBook`,persona)
  }

  verLibrosPorDevolver(cedula: string) : Observable<any>{
    return this.http.get(`${this.urlPersona}${cedula}/listBorrowed`)
  }

  devolverLibro(obj: Libro) : Observable<any>{
    return this.http.put(`${this.urlPersona}${obj.idLibro}/returnBook`, obj)
  }

  verMultas() : Observable<any>{
    return this.http.get(`${this.urlMulta}list`)
  }

  cancelarMulta(obj: Multa) : Observable<any>{
    return this.http.put(`${this.urlMulta}pay/${obj.idMulta}`, obj)
  }

  

}
