import { CurrentUser } from './../../model/current-user.model';
import { ResponseApi } from './../../model/ResponseApi';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { SharedService } from './../../services/shared.service';
import { Usuario } from './../../model/usuario.model';
import { Component, OnInit } from '@angular/core';

/**
 * Representa uma classe de login de componente
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser = new CurrentUser();
  usuario = new Usuario('','','','','','');
  shared: SharedService;
  message: string;
  
  constructor(private usuarioService: UsuarioService,private router: Router) { 
      this.shared = SharedService.getInstance();
    }

  ngOnInit() {  }

  //Realiza o login na pagina
  login(){

    console.log(this.usuario);

    this.usuarioService.authenticate(this.usuario).subscribe((responseApi:ResponseApi) => {

      this.currentUser = responseApi.data;
      this.shared.token = this.currentUser.token;
      this.shared.usuario = this.usuario;
      this.shared.usuario.perfis = '';
      this.shared.exibirTemplate.emit(true); //exibe os componentes de header e menu
      this.router.navigate(['/']);

    } , err => {
      this.shared.token = null;
      this.shared.usuario = null;
      this.shared.exibirTemplate.emit(false);
      this.message = 'Erro';      
    });

  }

  //Cancela a solicitacao de login
  cancelLogin(){
    this.message = '';
    this.usuario = new Usuario('','','','','','');
    window.location.href = '/login';
    window.location.reload();
  }

  getFromGroupClass(isInvalid:boolean,isDirty){
    return{
      'form-group' : true,
      'has-error': isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    };
  }


}
