import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { EndpointService } from 'src/app/services/endpoint.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Multa } from 'src/app/types/multa.type';

@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styleUrls: ['./multas.component.scss']
})
export class MultasComponent implements OnInit {

  busquedaFormGroup: FormGroup
  data: any;
  originalData: any

  displayedColumns: string[] = ['nombre', 'apellido', 'cedula', 'monto', 'codigo', 'titulo', 'cancelar'];
  busquedas: string[] = [
    'Nombre', 'Apellido', 'Libro'
  ]

  constructor(
    private endpointService: EndpointService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.data = this.endpointService.verMultas().subscribe(data => {
      this.data = data
      this.originalData = [...data];
    })

    this.initReactiveForm()  
  }

  initReactiveForm() {
    this.busquedaFormGroup = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      libro: [''],
      tipoBusqueda: ['']
    })

    this.busquedaFormGroup.get('tipoBusqueda').valueChanges.subscribe(value => {
      this.busquedaFormGroup.get('nombre').reset();
      this.busquedaFormGroup.get('apellido').reset();
      this.busquedaFormGroup.get('libro').reset();
    });

    this.busquedaFormGroup.get('nombre').valueChanges.subscribe(value => {
      this.filtrarTabla('nombre', value);
    });

    this.busquedaFormGroup.get('apellido').valueChanges.subscribe(value => {
      this.filtrarTabla('apellido', value);
    });

    this.busquedaFormGroup.get('libro').valueChanges.subscribe(value => {
      this.filtrarTabla('titulo', value);
    });
  }

  filtrarTabla(campo: string, valor: string) {
    this.data = [...this.originalData];

    if (valor && this.data) {
      this.data = this.data.filter((libro) => {
        return libro[campo] && libro[campo].toLowerCase().includes(valor.toLowerCase());
      })
    } else {
      this.endpointService.verMultas().subscribe(data => {
        this.data = data;
      });
    }
  }

  removerMulta(multa: any) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `¿Está seguro que desea cancelar la multa de ${multa.nombre} ${multa.apellido}?`
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.cancelarMulta(multa).then(response => {
          if (response) {
            this.snackBar.open('Multa cancelada con éxito', 'Cerrar', {
              duration: 2000
            });

            this.data = this.endpointService.verMultas().subscribe(data => {
              this.data = data
              this.originalData = [...data];
            })
          }
        });
      }
    });
  }

  async cancelarMulta(multa: Multa): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.endpointService.cancelarMulta(multa)
      );

      return response;
    } catch (error) {
      return error.error;
    }
  }

}
