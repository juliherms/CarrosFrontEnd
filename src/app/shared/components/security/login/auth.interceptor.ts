import { SharedService } from './../../../services/shared.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


//intercepta as requisicoes e renova o token do login
@Injectable() 
export class AuthInterceptor implements HttpInterceptor{

    shared: SharedService;

    constructor(){
        this.shared = SharedService.getInstance();
    }

    //Metodo resonsavel por interceptar e atualiza o token a cada requisicao.
    intercept(req: HttpRequest<any>,next:HttpHandler) : Observable<HttpEvent<any>>{
        let authRequest : any;

        
        if(this.shared.isLoggedIn()){

            authRequest = req.clone({
                setHeaders:{
                    'Authorization' : this.shared.token
                }
            });
            console.log(authRequest);
            return next.handle(authRequest);
        }else{
            return next.handle(req);
        }
    } 
}