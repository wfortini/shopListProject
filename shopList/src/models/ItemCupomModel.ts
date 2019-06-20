import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import * as Sequelize  from 'sequelize';
import { ModelInterface } from '../interfaces/ModelInterface';

export interface ItemCupomAttributes{

    id?: number;
    codigo?: string;
    descricao?: string;
    qtde?: number;
    unidade?: string;
    valorUnitario?: number;
    valorTotal?: number; 
    cupom?: number;    
    createdAt?: string;
    updated?: string;

}
export interface ItemCupomInstance extends Sequelize.Instance<ItemCupomAttributes>, ItemCupomAttributes {}

export interface ItemCupomModel extends BaseModelInterface, Sequelize.Model<ItemCupomInstance, ItemCupomAttributes>{}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) : ItemCupomModel => {

    const itemCupom: ItemCupomModel = 
          sequelize.define('ItemCupom', {
               id:{
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
               },
               codigo:{
                   type: DataTypes.STRING(128),
                   allowNull: false
               },
               descricao:{
                type: DataTypes.STRING(128),
                allowNull: false,                
            },
            qtde:{
                type: DataTypes.INTEGER,
                allowNull: true
            },
            unidade:{
                type: DataTypes.STRING(2),
                allowNull: true
            },
            valorUnitario:{
                type: DataTypes.DECIMAL(10,2),
                allowNull: true
            },
            valorTotal:{
                type: DataTypes.DECIMAL(10,2),
                allowNull: true
            },
            cupom:{
                type: DataTypes.BIGINT,
                allowNull: false
            }            

          }, {
              tableName: 'itens_cupom'
          });

          itemCupom.associate = (models: ModelInterface): void =>{
            itemCupom.belongsTo(models.Cupom, {
                foreignKey:{
                    allowNull: false,
                    field: 'cupom',
                    name: 'cupom'
                }
            })
        }
          return itemCupom;
}