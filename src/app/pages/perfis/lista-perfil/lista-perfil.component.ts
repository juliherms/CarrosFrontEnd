import { PerfilService } from './../../../shared/services/perfil.service';
import { DialogService } from './../../../dialog.service';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../shared/services/usuario.service';
import { SharedService } from './../../../shared/services/shared.service';
import { Usuario } from './../../../shared/model/usuario.model';
import { ResponseApi } from './../../../shared/model/ResponseApi';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-perfil',
  templateUrl: './lista-perfil.component.html',
  styleUrls: ['./lista-perfil.component.css']
})
export class ListaPerfilComponent implements OnInit {

  page:number=0;
  count:number=10;
  pages:Array<number>;
  shared : SharedService;
  message : {};
  classCss : {};
  listPerfil=[];

  constructor(private perfilService: PerfilService, 
              private router: Router,
              private dialogService: DialogService) {

      this.shared = SharedService.getInstance();

  }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  //metodo responsavel por listar os usuarios do sistema
  findAll(page:number,count:number){

    this.perfilService.findAllPaginado(page,count).subscribe((responseApi:ResponseApi) => {
        this.listPerfil = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }
  delete(id:number){
    this.dialogService.confirm('Tem certeza que deseja deletar este perfil?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.perfilService.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `perfil deletado`
                });
                this.findAll(this.page,this.count);
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
    this.router.navigate([`perfil-novo/${id}/editar`]);
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

