import { Perfil } from './../../../shared/model/perfil.model';
import { PerfilService } from './../../../shared/services/perfil.service';
import { BaseResourceFormComponent } from "../../../shared/components/baseResourceForm/base-resource-form.component";
import { Component, Injector ,OnInit} from '@angular/core';
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-novo-perfil',
  templateUrl: './novo-perfil.component.html',
  styleUrls: ['./novo-perfil.component.css']
})
export class NovoPerfilComponent extends BaseResourceFormComponent<Perfil> {

  //construtor da classe
  constructor(protected perfilService: PerfilService,protected injector: Injector) {
    super(injector,new Perfil(),perfilService,Perfil.fromJson);
  }

  //cria o formulario de time customizado
  protected buildResourceForm(){

    this.resourceForm = this.formBuilder.group({
      id:[null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      descricao: [null]
    });
  }

  //titulo da pagina
  protected creationPageTitle(): string {
    return "Cadastro de Novo Perfil";
  }

  //titulo de edicao
  protected editionPageTitle(): string {
    const nomePerfil = this.resource.nome || "";
    return "Editando Perfil: " + nomePerfil;
  }

}
