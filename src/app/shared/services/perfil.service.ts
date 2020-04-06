import { CARROS_API } from './carrosapi';
import { Perfil } from './../model/perfil.model';
import { Injectable,Injector } from '@angular/core';
import { BaseResourceService } from "../services/base-resource.service";

//Representa a classe de servicos de ferias
@Injectable({
    providedIn: 'root'
  })
  export class PerfilService extends BaseResourceService<Perfil> {

    constructor(protected injector: Injector)
    {
        //passa a url basica o injetor e a funcao responsavel por converter o objeto
        //no js é possível passar a funcao como parametro
        super(`${CARROS_API}/perfis`,injector,Perfil.fromJson);
    }

    findAllPaginado(page:number,count:number){
      return this.http.get(`${CARROS_API}/perfis/listar?page=${page}&count=${count}`);
  }
}

  