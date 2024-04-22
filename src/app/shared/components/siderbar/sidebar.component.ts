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

  constructor(
    private router: Router,
    protected appService: AppService
  ) { }

  ngOnInit(): void {
    this.persona = this.appService.persona;
    console.log(`Persona: ${this.persona}`);
    
  }

  obtenerNombrePersona(){
    return this.persona.nombres + ' ' + this.persona.apellidos;
  }

  onClickNavigate(url: string) {
    this.router.navigate([url]);
  }

}
