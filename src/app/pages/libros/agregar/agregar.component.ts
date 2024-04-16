import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  libroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()
  }

  initReactiveForm(){
    this.libroForm = this.formBuilder.group({
      autor: [''],
      anoEdicion: [''],
      genero: [''],
      codigo: [''],
      id: ['']
    })
  }

  onSubmit() {
    console.log(this.libroForm.value);
  }

  volver(){
    this.router.navigate(['dashboard'])
  }

}
