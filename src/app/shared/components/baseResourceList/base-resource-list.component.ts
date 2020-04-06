import { OnInit } from '@angular/core';
import { BaseResourceModel } from "../../model/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";

//Classe generica para listagem de entidade
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
    
    //lista de resource
    resources: T[] = [];

    constructor(private resourceService: BaseResourceService<T>) { }

    //Metodo responsavel por carregar o itens na lista
    ngOnInit() {
        //retorna uma lista de entidade
        this.resourceService.getAll().subscribe(
          resources => this.resources = resources.sort((a,b) => b.id - a.id),
          error => alert("Erro ao carregar a lista")
        )
    }

    //Metodo responsavel por deletar um item da lista.
    deleteResource(resource: T){
    const deveDeletar = confirm('Deseja realmente excluir este item?');

    if(deveDeletar){
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element != resource),
        () => alert("Erro ao tentar excluir!")
      )
    }
  }
}