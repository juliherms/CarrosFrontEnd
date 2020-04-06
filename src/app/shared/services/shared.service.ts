import { Usuario } from './../model/usuario.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//j.a.vasconcelos
//Classe responsavel por guardar o usuario e o token
export class SharedService {

  public static instance: SharedService = null;
  usuario: Usuario;
  token:string;

  exibirTemplate = new EventEmitter<Boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance(){
    if(this.instance == null){
      this.instance = new SharedService();
    }
    return this.instance;
  }

  //Verifica se um usuario esta logado
  isLoggedIn():boolean{
    if(this.usuario == null){
      return false;
    }
    return this.usuario.login != '';
  }
}
