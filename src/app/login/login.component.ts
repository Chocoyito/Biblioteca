import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()
  }

  initReactiveForm() {
    this.loginForm = this.formBuilder.group({
      usuario: [''],
      contrasena: ['']
    })
  }


  procesarDatos(){    
    if (this.loginForm.get('usuario')?.value == "Papu" && this.loginForm.get('contrasena')?.value == '123') {

      this.router.navigate(['dashboard'])
    }
  }



}
