import { HistoricModel } from './../models/HistoricModel';
import { UserModel } from './../models/UserModel';
export interface ModelInterface{
    
    User: UserModel;
    Historic: HistoricModel;
}