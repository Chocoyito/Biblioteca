import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  invitado: boolean

  constructor() { }

  setInvitado(bool:  boolean){
    this.invitado = bool
  }

  getInvitado(){
    return this.invitado
  }
}
