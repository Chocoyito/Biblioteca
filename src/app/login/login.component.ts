import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Persona } from '../types/persona.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invitado: boolean;
  persona: Persona = {} as Persona;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()
    this.invitado = false
    this.appService.invitado = false
  }

  initReactiveForm() {
    this.loginForm = this.formBuilder.group({
      usuario: [''],
      contrasena: [''],
      nombres: [''],
      apellidos: [''],
      cedula: [''],
    })
  }


  procesarDatos(){    
    if (this.loginForm.get('usuario')?.value == "Papu" && this.loginForm.get('contrasena')?.value == '123') {
      this.router.navigate(['dashboard'])
    }
    else if(this.invitado){
      this.persona = {
        nombres:this.loginForm.get('nombres')?.value,
        apellidos:this.loginForm.get('apellidos')?.value,
        cedula:this.loginForm.get('cedula')?.value
      }
      this.appService.persona = this.persona 

      this.router.navigate(['dashboard'])
    }
  }

  
  iniciarInvitado(){
    this.invitado = true
    this.appService.invitado = true
  }

  iniciarAdministrador(){
    this.invitado = false
    this.appService.invitado = false
  }
}
