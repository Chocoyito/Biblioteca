import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invitado: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()
    this.invitado = false
    this.appService.setInvitado(false)
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
      this.router.navigate(['dashboard'])
    
    }
  }

  
  iniciarInvitado(){
    this.invitado = true
    this.appService.setInvitado(true)
  }


  iniciarAdministrador(){
    this.invitado = false
    this.appService.setInvitado(false)
  }
}
