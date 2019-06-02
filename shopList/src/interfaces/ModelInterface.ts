import { ProdutoModel } from './../models/ProdutoModel';
import { HistoricoModel } from '../models/HistoricoModel';
import { UserModel } from './../models/UserModel';
import { ItemCupomModel } from '../models/ItemCupomModel';
import { CupomModel } from '../models/CupomModel';

export interface ModelInterface{
    
    User: UserModel;
    Historico: HistoricoModel;
    Cupom: CupomModel;
    ItemCupom: ItemCupomModel;
    Produto: ProdutoModel;
}