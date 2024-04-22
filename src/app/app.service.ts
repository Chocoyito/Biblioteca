import { Injectable } from '@angular/core';
import { Persona } from './types/persona.type';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor() { }

  private _invitado: boolean;
  get invitado(): boolean {
    return this._invitado;
  }
  set invitado(value: boolean) {
    this._invitado = value;
  }

  private _persona: Persona;
  get persona(): Persona {
    return this._persona;
  }
  set persona(value: Persona) {
    this._persona = value;
  }
}
