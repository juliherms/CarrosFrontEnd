import { SharedService } from './../../services/shared.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

//Classe responsavel por verificar se o usuario esta logado.
@Injectable()
export class AuthGuard implements CanActivate{
    
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    //servico de verificacao de usuario logado
    public shared: SharedService;

    constructor(private router:Router){
        this.shared = SharedService.getInstance();
    }

    canActivate(route:ActivatedRouteSnapshot,
                state:RouterStateSnapshot): Observable<boolean> | boolean {

        //usuario esta logado
        if(this.shared.isLoggedIn()){
            return true;
        }else{
        //usuario nao esta logado e deve ir para a tela de login
            this.router.navigate(['/login'])
            return false;
        }

    }

}