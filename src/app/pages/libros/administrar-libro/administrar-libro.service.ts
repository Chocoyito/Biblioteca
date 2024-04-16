import { Injectable } from '@angular/core';
import { LibrosService } from '../libros.service';
import { Libro } from 'src/app/types/libro.type';

@Injectable({
  providedIn: 'root'
})
export class AdministrarLibroService {

  constructor(private librosService: LibrosService) { }

  guardarLibro(obj: Libro){
    this.librosService.guardarLibro(obj)
  }
}
