import { CARROS_API } from './carrosapi';
import { Usuario } from './../model/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {

    constructor(private http: HttpClient) {}

    //Metodo responsavel por realizar o login da aplicacao.
    login(usuario:Usuario){

        console.log(`${CARROS_API}/signin`);
        console.log(usuario);


        return this.http.post(`${CARROS_API}/signin`,usuario);
    }

    //metodo responsavel por realizar o login
    authenticate(creds: Usuario){
        //realiza a chamada do metodo login via POST.
         return this.http.post(`${CARROS_API}/signin`,creds);
    }


    //Metodo responsavel por criar ou salvar um usuario
    createOrUpdate(usuario:Usuario){

        if(usuario.id != null && usuario.id != ''){
            return this.http.put(`${CARROS_API}/usuarios`,usuario);
        }else{
            console.log(usuario);
            usuario.id = null;
            return this.http.post(`${CARROS_API}/usuarios`,usuario);
        }
    }

    //Metodo responsavel por pesquisar um usuario por id
    findById(id:string){
        return this.http.get(`${CARROS_API}/usuarios/${id}`);
    }

    //delete um registro no banco de dados
    delete(id:string){
        return this.http.delete(`${CARROS_API}/usuarios/${id}`);
    }

  }