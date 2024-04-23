import { EventEmitter, Injectable } from '@angular/core';
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

  private _usuario: string;
  get usuario(): string {
    return this._usuario;
  }
  set usuario(value: string) {
    this._usuario = value;
  }

  private _persona: Persona;
  get persona(): Persona {
    return this._persona;
  }
  set persona(value: Persona) {
    this._persona = value;
  }

  private enPosesion: EventEmitter<boolean> = new EventEmitter<boolean>();
  getEnPosesion(): EventEmitter<boolean> {
    return this.enPosesion;
  }
  setEnPosesion(value: boolean) {
    this.enPosesion.emit(value);
  }

  private titulo: EventEmitter<string> = new EventEmitter<string>();
  getTitulo(): EventEmitter<string> {
    return this.titulo;
  }
  setTitulo(value: string) {
    this.titulo.emit(value);
  }

  deleteData() {
    this._persona = null;
    this._usuario = null;
    this._invitado = null;
  }
}
