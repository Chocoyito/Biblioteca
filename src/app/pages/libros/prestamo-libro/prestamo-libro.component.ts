import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from '../libros.service';
import { Libro } from 'src/app/types/libro.type';
import { Persona } from 'src/app/types/persona.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prestamo-libro',
  templateUrl: './prestamo-libro.component.html',
  styleUrls: ['./prestamo-libro.component.scss']
})
export class PrestamoLibroComponent implements OnInit {

  prestamoForm: FormGroup
  libro: Libro = {} as Libro;
  persona: Persona = {} as Persona;
  libroSeleccionado: Libro = {} as Libro;
  rutaActual: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private librosService: LibrosService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()

    this.libroSeleccionado = this.librosService.getLibroSeleccionado()

    console.log(this.libroSeleccionado);
    

    if(this.libroSeleccionado){
      this.prestamoForm.get('codigo')?.setValue(this.libroSeleccionado.idLibro)
      this.prestamoForm.get('titulo')?.setValue(this.libroSeleccionado.titulo)
      this.prestamoForm.get('autor')?.setValue(this.libroSeleccionado.autor)
     // this.prestamoForm.get('codigo')?.setValue(this.libroSeleccionado.codigo)
     
      this.prestamoForm.get('fechaPrestamo')?.setValue(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())

      this.prestamoForm.get('titulo')?.disable()
      this.prestamoForm.get('autor')?.disable()
      this.prestamoForm.get('codigo')?.disable()
      this.prestamoForm.get('fechaPrestamo')?.disable()
    }
  }

  procesarPrestamo() {
    return new Promise<any>(resolve => {
      this.libro = {
        titulo: this.prestamoForm.get('titulo')?.value,
        autor: this.prestamoForm.get('autor')?.value,
        anioEdicion: this.prestamoForm.get('anoEdicion')?.value,
        genero: this.prestamoForm.get('genero')?.value,
        codigo: this.prestamoForm.get('codigo')?.value,  
        idLibro: this.prestamoForm.get('idLibro')?.value           
      };
  
      this.persona = {
        nombre: this.prestamoForm.get('nombres')?.value,
        apellido: this.prestamoForm.get('apellidos')?.value,
        cedula: this.prestamoForm.get('cedula')?.value,     
      };
  
      this.librosService.prestarLibro(this.persona, this.libro).then(result => {
        this.router.navigate(['dashboard']);
       this.mostrarSnackBar('Préstamo exitoso');
        resolve(result);
      }).catch(error => {
        console.error('Error al solicitar préstamo:', error);
        this.mostrarSnackBar('Error al solicitar préstamo');
        resolve(error);
      });
    });
  }
  
  mostrarSnackBar(mensaje: string): void {
    const snackBarRef = this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000, // Duración del Snackbar en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('SnackBar cerrado');
    });
  }
  
  initReactiveForm(){
    this.prestamoForm = this.formBuilder.group({
      nombres: [''],
      apellidos: [''],
      cedula: [''],
      fechaPrestamo: [''],
      titulo: [''],
      autor: [''],
      codigo: [''],

    })
  }

  




  onSubmit() {
        this.procesarPrestamo()
    
  }

  volver() {
    this.router.navigate(['dashboard'])
  }
}
