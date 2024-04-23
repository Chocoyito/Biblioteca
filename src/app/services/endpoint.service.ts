import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../types/libro.type';
import { Usuario } from '../types/usuario.type';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor(
    private http: HttpClient
  ) { }

  urlLibro: string = 'http://localhost:8080/book/';
  urlUsuario: string = 'http://localhost:8080/';


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

  iniciarSesion(obj: Usuario) : Observable<any>{
     return this.http.get(`${this.urlUsuario}login?user=${obj.usuario}&password=${obj.contrasena}`)
  }

}
