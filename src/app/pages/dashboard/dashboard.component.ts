import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibrosService } from '../libros/libros.service';
import { Libro } from 'src/app/types/libro.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Persona } from 'src/app/types/persona.type';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['titulo', 'autor', 'anoEdicion', 'genero', 'codigo', 'editar', 'visualizar'];

  displayedColumnsInvitado: string[] = ['titulo', 'autor', 'anoEdicion', 'genero', 'codigo',  'visualizar', 'prestar'];
  displayedColumnsDevolver: string[] = ['titulo', 'autor', 'anoEdicion', 'genero', 'codigo', 'visualizar', 'devolver'];


  busquedas: string[] = [
    'Titulo', 'Autor', 'Género'
  ]

  generos: string[] = [
    'Suspenso', 'Romance', 'Accion', 'Ciencia ficcion', 'Terror'
  ]

  data: any;
  originalData: any
  persona: Persona = {} as Persona;

  busquedaFormGroup: FormGroup
  valorBusqueda: string
  enPosesion: boolean

  showSpinner: boolean = true

  constructor(
    private router: Router, 
    private librosService: LibrosService,
    private formBuilder: FormBuilder,
    protected appService: AppService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.appService.setTitulo('Libros');
    this.persona = this.appService.persona;
    this.data = this.librosService.verLibros().subscribe(data => {
      this.data = data
      this.originalData = [...data];
    })

    this.initReactiveForm()  
  }

  initReactiveForm() {
    this.busquedaFormGroup = this.formBuilder.group({
      titulo: [''],
      autor: [''],
      genero: [''],
      tipoBusqueda: ['']
    });

    this.appService.getEnPosesion().subscribe(data => {
      console.log('not yet')
      if(data === true){
        this.enPosesion = true;
        this.data = this.librosService.verLibrosPorDevolver(this.persona.cedula).subscribe(data => {
          this.data = data
          this.originalData = [...data];
        })
      } else if (data === false) {
        this.enPosesion = false;
        this.data = this.librosService.verLibros().subscribe(data => {
          this.data = data
          this.originalData = [...data];
        })
      }
    })

    this.busquedaFormGroup.get('tipoBusqueda').valueChanges.subscribe(value => {
      this.busquedaFormGroup.get('titulo').reset();
      this.busquedaFormGroup.get('autor').reset();
      this.busquedaFormGroup.get('genero').reset();
  
      this.valorBusqueda = value;
    });

    this.busquedaFormGroup.get('titulo').valueChanges.subscribe(value => {
      this.filtrarTabla('titulo', value);
    })

    this.busquedaFormGroup.get('autor').valueChanges.subscribe(value => {
      this.filtrarTabla('autor', value);
    })

    this.busquedaFormGroup.get('genero').valueChanges.subscribe(value => {
      this.filtrarTabla('genero', value);
    })
  }

  filtrarTabla(campo: string, valor: string) {
    this.data = [...this.originalData];

    if (valor && this.data) {
      this.data = this.data.filter((libro) => {
        return libro[campo] && libro[campo].toLowerCase().includes(valor.toLowerCase());
      })
    } else {
      this.librosService.verLibros().subscribe(data => {
        this.data = data;
      });
    }
  }

  editarLibro(element: any) {
    this.librosService.setLibroSeleccionado(element);
    this.router.navigate(['libros/administrar/editar']);
  }

  visualizarLibro(element: any) {
    this.librosService.setLibroSeleccionado(element);
    this.router.navigate(['libros/administrar/visualizar']);
  }

  prestarLibro(element: any) {
    this.librosService.setLibroSeleccionado(element);
    this.router.navigate(['libros/prestar']);
  }

  devolverLibro(element: any) {
    this.librosService.setLibroSeleccionado(element);
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        mensaje: `¿Está seguro que desea devolver el libro ${element.titulo}?`
      }
    }).afterClosed().subscribe(result => {
      if(result){
        this.librosService.devolverLibro(element).then(result => {
          this.snackBar.open('Libro devuelto con éxito', 'Cerrar', {
            duration: 2000
          });
        })
      }
    })
  }
}
