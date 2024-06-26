import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from '../libros.service';
import { Libro } from 'src/app/types/libro.type';
import { Persona } from 'src/app/types/persona.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-prestamo-libro',
  templateUrl: './prestamo-libro.component.html',
  styleUrls: ['./prestamo-libro.component.scss']
})
export class PrestamoLibroComponent implements OnInit {

  prestamoForm: FormGroup
  libro: Libro = {} as Libro;
  libroSeleccionado: Libro = {} as Libro;
  persona: Persona = {} as Persona;

  rutaActual: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private librosService: LibrosService,
    private snackBar: MatSnackBar, // Inyectar MatSnackBar
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()
    this.libroSeleccionado = this.librosService.getLibroSeleccionado()
    //Inicializar persona con los datos de localstorage
    const personaJSON = localStorage.getItem('persona');
      this.persona = localStorage.getItem('persona') ? JSON.parse(personaJSON) : {} as Persona;
      console.log(this.persona);
    console.log(this.libroSeleccionado);


    if (this.libroSeleccionado) {
      this.prestamoForm.get('codigo')?.setValue(this.libroSeleccionado.codigo)
      this.prestamoForm.get('titulo')?.setValue(this.libroSeleccionado.titulo)
      this.prestamoForm.get('autor')?.setValue(this.libroSeleccionado.autor)
      this.prestamoForm.get('fechaPrestamo')?.setValue(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())
      this.prestamoForm.get('idLibro')?.setValue(this.libroSeleccionado.idLibro)

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

      this.librosService.prestarLibro(this.appService.persona, this.libro).then(result => {
        resolve(result);
      }).catch(error => {
        this.mostrarSnackBar('Error al solicitar préstamo');
        resolve(error);
      });
    });
  }


  obtenerNombrePersona(){
    return this.persona.nombre + ' ' + this.persona.apellido+ ' ' + this.persona.cedula;
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

  initReactiveForm() {
    this.prestamoForm = this.formBuilder.group({
      nombres: [''],
      apellidos: [''],
      cedula: [''],
      fechaPrestamo: [''],
      titulo: [''],
      autor: [''],
      codigo: [''],
      idLibro: ['']
    })
  }

  onSubmit() {
    this.procesarPrestamo().then(result => {
      console.log(result);
      if (result.text == 'REGISTRO ACTUALIZADO') {
        this.mostrarSnackBar('Préstamo solicitado con éxito');
        this.router.navigate(['dashboard'])
      } else {
        this.mostrarSnackBar(result.text);
      }
    });
  }

  volver() {
    this.router.navigate(['dashboard'])
  }
}
