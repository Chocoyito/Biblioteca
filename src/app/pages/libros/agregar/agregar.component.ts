import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  libroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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

}
