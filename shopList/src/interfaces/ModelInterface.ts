import { HistoricModel } from './../models/HistoricModel';
import { UserModel } from './../models/UserModel';
import { ItemCupomModel } from '../models/ItemCupomModel';
import { CupomModel } from '../models/CupomModel';

export interface ModelInterface{
    
    User: UserModel;
    Historic: HistoricModel;
    Cupom: CupomModel;
    ItemCupom: ItemCupomModel;
}