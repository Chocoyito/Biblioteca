import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../types/libro.type';

@Injectable({
  providedIn: 'root'
})
export class LibrosEndpointService {

  constructor(
    private http: HttpClient
  ) { }

  urlErick: string = 'http://192.168.137.158:8080/book/';


  verLibros() : Observable<any>{
    return this.http.get(`${this.urlErick}list`)
  }

  guardarLibros(obj: Libro) : Observable<any>{
    return this.http.post(`${this.urlErick}add`, obj)
  }

  editarLibro(obj: Libro) : Observable<any>{  
    return this.http.put(`${this.urlErick}edit/${obj.idLibro}`, obj)
  }

  eliminarLibro(obj: Libro) : Observable<any>{
    return this.http.put(`${this.urlErick}delete/${obj.idLibro}`, obj)
  }

}
