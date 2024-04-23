import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  titulo: string;
  constructor(
    private appService: AppService
  ) { 
    
  }

  ngOnInit(): void {
    this.appService.getTitulo().subscribe(titulo => {
      this.titulo = titulo;
    })
  }

}
