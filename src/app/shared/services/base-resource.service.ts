import { Observable,throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseResourceModel} from '../model/base-resource.model';
import { map,catchError} from "rxjs/operators";
import { Injector,Inject} from "@angular/core";

//Representa uma classe de servicos generica
export abstract class BaseResourceService<T extends BaseResourceModel>{

    protected http: HttpClient;

    constructor(protected apiPath:string,
                protected injector: Injector,
                protected jsonDataToResourceFn:(jsonData:any) => T)
    {
        //injetor me dê uma instância de httpclient;
        this.http = injector.get(HttpClient);
    }


      //Retorna uma lista de todos os recursos
  getAll(): Observable<T[]>{
    return this.http.get(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this['data'])),
      catchError(this.handleError)
      
    )
  }

/*
    this.usuarioService.findAllPaginado(page,count).subscribe((responseApi:ResponseApi) => {
        this.listUsuario = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    }); */



    //Recupera um recurso por id informado
    getById(id: number): Observable<T>{
        //monta a url com o id
        const url = `${this.apiPath}/${id}`;
    
        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    //cria um resource
    create(resource: T): Observable<T>{
        return this.http.post(this.apiPath,resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    //Atualiza um resource
    update(resource: T): Observable<T>{
        const url = `${this.apiPath}/${resource.id}`;

        return this.http.put(url,resource).pipe(
            catchError(this.handleError),
            map(() => resource)//deixar igual ao create
        )
    }

    //Deleta um resource
    delete(id: number): Observable<any>{
        //monta a url com o id
        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url).pipe(
            catchError(this.handleError),
            map(() => null)
        )
    }        

    //METODOS PROTEGIDOS =========================================================================

    //Converte um json em lista de objetos de resources
    protected jsonDataToResources(jsonData: any[]): T[]{
        const resources: T[] = [];
        //passo a minha function como parametro
        jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));
        return resources;
    }


    //Converte um objeto json para resource
    protected jsonDataToResource(jsonData: any): T{
        //passo a minha function como parametro
        return this.jsonDataToResourceFn(jsonData);
    }
    

    //Levanta e loga uma mensagem de erro 
    protected handleError(error: any): Observable<any>{
        console.log("ERRO NA REQUISIÇÃO => ", error );
        return throwError(error);
    }

}