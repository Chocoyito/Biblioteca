import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Persona } from 'src/app/types/persona.type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  persona: Persona = {} as Persona;
  username: string
  invitado: boolean;

  constructor(
    private router: Router,
    protected appService: AppService
  ) { }

  ngOnInit(): void {
    this.persona = this.appService.persona;
    this.username = this.appService.usuario;
    this.invitado = this.appService.invitado;
    console.log(`Persona: ${this.persona}`);
    
  }

  obtenerNombrePersona(){
    return this.persona.nombre + ' ' + this.persona.apellido;
  }

  onClickNavigate(url: string) {
    this.router.navigate([url]);
  }

  listarLibrosEnPosesion(){
    this.appService.setTitulo('Libros en posesión');
    this.appService.setEnPosesion(true);
    this.router.navigate(['/dashboard']);
  }
}
