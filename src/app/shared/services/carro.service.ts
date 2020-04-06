import { Carro } from './../model/carro.model';
import { CARROS_API } from './carrosapi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class CarroService {

    constructor(private http: HttpClient) {}
    
        //Metodo responsavel por criar ou salvar um carro
        createOrUpdate(carro:Carro){

            if(carro.id != null && carro.id > 0 ){
                return this.http.put(`${CARROS_API}/cars/${carro.id}`,carro);
            }else{
                console.log(carro);
                console.log(`${CARROS_API}/cars`);
                carro.id = 0;
                return this.http.post(`${CARROS_API}/cars`,carro);
            }
        }

        //Metodo responsavel por pesquisar um carro por id
        findById(id:string){
            return this.http.get(`${CARROS_API}/cars/${id}`);
        }

        //Metodo responsavel por listar todos os carros de um usuario.
        findAll(){
            return this.http.get(`${CARROS_API}/cars/`);
        }

        //delete um registro no banco de dados
        delete(id:string){
            return this.http.delete(`${CARROS_API}/cars/${id}`);
        }
    
  }
