import { BaseResourceModel} from "../model/base-resource.model";

/**
 * Representa uma classe de perfil
 */
export class Perfil extends BaseResourceModel {

    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public ativo?: boolean
    ){
        super();        
    }

    //converte json em objeto
    static fromJson(jsonData: any): Perfil {
        console.log("caiu");
        return Object.assign(new Perfil(),jsonData);
    }

}