import { CarroService } from './../../../shared/services/carro.service';
import { ResponseApi } from '../../../shared/model/ResponseApi';
import { Usuario } from '../../../shared/model/usuario.model';
import { Carro } from '../../../shared/model/carro.model';
import { SharedService } from '../../../shared/services/shared.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';

declare var $: any;

//Classe responsavel por cadastrar um novo carro no sistema
@Component({
  selector: 'app-carro-usuario',
  templateUrl: './novo-carro.component.html',
  styleUrls: ['./novo-carro.component.css']
})
export class NovoCarroComponent implements OnInit {

  @ViewChild("form")
  form:NgForm

  carro = new Carro(0,0,'','','');

  shared: SharedService;
  message: {};
  classCss: {};

  constructor(private carroSevice:CarroService,private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();
  }

  //metodo chamado ao carregar a tela
  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  //pesquisa o carro por id informado
  findById(id:string){
    this.carroSevice.findById(id).subscribe((responseApi:ResponseApi) => {
      console.log(responseApi.data);
      this.carro = responseApi.data;
    } , err => {

      console.log(err);
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  //Monta a mensagem de validacao a a sua validacao.
  private showMessage(message:{type:string,text:string}):void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() =>{
      this.message = undefined;
    },3000);
  }

  private buildClasses(type:string):void{
    this.classCss = {
      'alert' : true
    }

    this.classCss['alert-'+type] = true;
  }

  getFromGroupClass(isInvalid:boolean,isDirty){
    return{
      'form-group' : true,
      'has-error': isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    };
  }

  //Cria ou atualiza o usuario
  register(){
    this.message = {};
    
    this.carroSevice.createOrUpdate(this.carro).subscribe((responseApi: ResponseApi) =>{
      this.carro = new Carro(0,0,'','','');
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text:`Carro Registrado com sucesso!`
      });
    }, err =>{

      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]['message']
      });
    }); 
  }
}
