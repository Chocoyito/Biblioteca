import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/libros';

  guardarLibro(objeto: any): Observable<any>{
    return this.http.post(this.url, objeto) 
  }

  obtenerListaLibros(): Observable<any>{
    return this.http.get(this.url) 
  }

  editarLibro(objeto: any): Observable<any>{
    return this.http.put(this.url, objeto) 
  }
}
