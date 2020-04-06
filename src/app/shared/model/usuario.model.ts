//Representa uma classe de usuario
export class Usuario{
    constructor(
        public id: string,
        public login:string,
        public password:string,
        public nome :string,
        public dataCadastro: string,
        public perfis:string
    ){}
}