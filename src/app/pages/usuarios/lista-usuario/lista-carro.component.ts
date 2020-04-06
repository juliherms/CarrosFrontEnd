import { CarroService } from './../../../shared/services/carro.service';
import { DialogService } from './../../../dialog.service';
import { Router } from '@angular/router';
import { SharedService } from './../../../shared/services/shared.service';
import { ResponseApi } from './../../../shared/model/ResponseApi';
import { Component, OnInit } from '@angular/core';

/** Componente responsavel por listar os usuarios do sistema */
@Component({
  selector: 'app-lista-carro',
  templateUrl: './lista-carro.component.html',
  styleUrls: ['./lista-carro.component.css']
})
export class ListaCarroComponent implements OnInit {

  shared : SharedService;
  message : {};
  classCss : {};
  listCarro=[];

  constructor(private carroSevice: CarroService, 
              private router: Router,
              private dialogService: DialogService) {

                this.shared = SharedService.getInstance();

              }

  ngOnInit() {
      this.findAll();
  }

  //metodo responsavel por listar os carros do sistema
  findAll(){

    this.carroSevice.findAll().subscribe((responseApi:ResponseApi) => {
        this.listCarro = responseApi['data'];
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  //Método responsável por deletar um carro no banco de dados
  delete(id:string){
    
    this.dialogService.confirm('Tem certeza que deseja deletar este carro?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.carroSevice.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Carro deletado`
                });
                this.findAll();
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      }); 
  }

  //botao editar
  edit(id:string){
    this.router.navigate(['/carro-novo',id]);
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] =  true;
  }
  

}
