import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Persona } from '../types/persona.type';
import { Usuario } from '../types/usuario.type';
import { EndpointService } from '../services/endpoint.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invitado: boolean;
  persona: Persona = {} as Persona;
  usuario: Usuario = {} as Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService,
    private endpointService: EndpointService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()
    this.invitado = false
    this.appService.invitado = false
    this.appService.deleteData()
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
    return new Promise<any>(resolve => {
      this.usuario = {
        usuario: this.loginForm.get('usuario')?.value,
        contrasena: this.loginForm.get('contrasena')?.value
      }
      
        this.iniciarSesion(this.usuario).then(result => {
          console.log('entrar al inciar session:');
          this.guardarDatosPersona()
          console.log(result)
          resolve(result)
        })
    })
  }

  guardarDatosPersona(){
        console.log('entrar a guardar datos:');

    const persona: Persona = {
      nombre: this.loginForm.get('nombres')?.value,
      apellido: this.loginForm.get('apellidos')?.value,
      cedula: this.loginForm.get('cedula')?.value
    };
    console.log('Persona:', persona);
    localStorage.setItem('persona', JSON.stringify(persona));

  }

  async iniciarSesion(usuario: Usuario): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.endpointService.iniciarSesion(usuario)
      );

      return response;
    } catch (error) {
      return error.error;
    }
  }

  onSubmit(){
    if(this.invitado){
      if(this.loginForm.get('nombres')?.value == '' || this.loginForm.get('apellidos')?.value == '' || this.loginForm.get('cedula')?.value == ''){
        this.matSnackBar.open('Por favor, complete todos los campos', 'Cerrar', {
          duration: 2000
        })
      }
      this.iniciarInvitado()
      this.appService.persona = {
        nombre: this.loginForm.get('nombres')?.value,
        apellido: this.loginForm.get('apellidos')?.value,
        cedula: this.loginForm.get('cedula')?.value
      }
      this.router.navigate(['dashboard'])
      return
    }

    this.procesarDatos().then(result => {
      if(result){
        this.iniciarAdministrador()
        this.appService.usuario = this.loginForm.get('usuario')?.value
        this.router.navigate(['dashboard'])
      } else {
        this.loginForm.get('contrasena').setValue('')
        this.matSnackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
          duration: 2000
        })
      }
    })
  }

  
  iniciarInvitado(){
    this.invitado = true
    this.appService.invitado = true
    this.guardarDatosPersona()

  }

  iniciarAdministrador(){
    this.invitado = false
    this.appService.invitado = false
  }
}
