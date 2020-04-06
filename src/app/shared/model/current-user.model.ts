import { Usuario } from './usuario.model';

//classe responsavel por representar um usuario logado.
export class CurrentUser{
    public token: string;
    public user:Usuario
}