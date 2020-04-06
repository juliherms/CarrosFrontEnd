import { ListaCarroComponent } from './pages/usuarios/lista-usuario/lista-carro.component';
import { NovoCarroComponent } from './pages/usuarios/novo-usuario/novo-carro.component';
import { AuthGuard } from './shared/components/security/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';

//configuracao de rotas
export const ROUTES:Routes = [
    { path: '', component:HomeComponent, canActivate: [AuthGuard]},
    { path: 'carro-novo', component:NovoCarroComponent, canActivate:[AuthGuard]},
    { path: 'carro-lista', component:ListaCarroComponent, canActivate:[AuthGuard]},
    { path: 'carro-novo/:id' , component: NovoCarroComponent, canActivate: [AuthGuard] },
    { path: 'login', component:LoginComponent}
]

export const routes:ModuleWithProviders = RouterModule.forRoot(ROUTES);