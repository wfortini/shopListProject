import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import * as Sequelize  from 'sequelize';
import { ModelInterface } from '../interfaces/ModelInterface';


export interface HistoricAttributes{
    id?: string;
    description?: string;
    user?: string;
   dataIncial?: Date;
   dataFinal?: Date;
   numHistorico?: number;
   createdAt?: string;
   updatedAt?: string;
}

export interface HistoricInstance extends Sequelize.Instance<HistoricAttributes>, HistoricAttributes {

}

export interface HistoricModel extends BaseModelInterface, Sequelize.Model<HistoricInstance, HistoricAttributes>{

}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) : HistoricModel => {

    const historic: HistoricModel = 
          sequelize.define('Historic', {
               id:{
                  type: DataTypes.STRING,
                  allowNull: false,
                  primaryKey: true
               },
               description:{
                   type: DataTypes.STRING(200),
                   allowNull: false
               },
               dataIncial:{
                type: DataTypes.DATE,
                allowNull: false
            },
            dataFinal:{
                type: DataTypes.DATE,
                allowNull: true
            },
            numHistorico:{
                type: DataTypes.INTEGER,
                allowNull: false
            }

          }, {
              tableName: 'historical'
          });

          historic.associate = (models: ModelInterface): void =>{
              historic.belongsTo(models.User, {
                  foreignKey:{
                      allowNull: false,
                      field: 'user',
                      name: 'user'
                  }
              })
          }

          return historic;
}