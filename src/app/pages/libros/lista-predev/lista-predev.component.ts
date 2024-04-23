import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { EndpointService } from 'src/app/services/endpoint.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-lista-predev',
  templateUrl: './lista-predev.component.html',
  styleUrls: ['./lista-predev.component.scss']
})
export class ListaPredevComponent implements OnInit {

  busquedaFormGroup: FormGroup
  data: any;
  originalData: any

  displayedColumns: string[] = ['codigo', 'titulo', 'cedula', 'nombre', 'apellido', 'fecha', 'tipo'];
  busquedas: string[] = [
    'Cedula', 'Codigo', 'Fecha', 'Tipo'
  ]

  constructor(
    private endpointService: EndpointService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.setTitulo('Prestamos & Devoluciones');
    this.data = this.endpointService.verPredev().subscribe(data => {
      this.data = data
      this.originalData = [...data];
    })

    this.initReactiveForm()  
  }

  initReactiveForm() {
    
    this.busquedaFormGroup = this.formBuilder.group({
      cedula: [''],
      codigo: [''],
      fecha: [''],
      tipo: [''],
      tipoBusqueda: ['']
    })

    this.busquedaFormGroup.get('tipoBusqueda').valueChanges.subscribe(value => {
      this.busquedaFormGroup.get('cedula').reset();
      this.busquedaFormGroup.get('codigo').reset();
      this.busquedaFormGroup.get('fecha').reset();
      this.busquedaFormGroup.get('tipo').reset();
    });

    this.busquedaFormGroup.get('cedula').valueChanges.subscribe(value => {
      this.filtrarTabla('cedula', value);
    });

    this.busquedaFormGroup.get('codigo').valueChanges.subscribe(value => {
      this.filtrarTabla('codigo', value);
    });

    this.busquedaFormGroup.get('fecha').valueChanges.subscribe(value => {
      this.filtrarTabla('fecha', value);
    });

    this.busquedaFormGroup.get('tipo').valueChanges.subscribe(value => {
      this.filtrarTabla('tipo', value);
    });

  }

  filtrarTabla(campo: string, valor: string) {
    this.data = [...this.originalData];

    if (valor && this.data) {
      this.data = this.data.filter((libro) => {
        return libro[campo] && libro[campo].toLowerCase().includes(valor.toLowerCase());
      })
    } else {
      this.endpointService.verPredev().subscribe(data => {
        this.data = data;
      });
    }
  }

  parseoFecha(fecha: string) {
    let date = new Date(fecha)
    return date.getFullYear() + '-' + (date.getMonth() > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) ) + '-' + date.getDate()
  }

}
