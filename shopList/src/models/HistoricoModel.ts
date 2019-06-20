import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import * as Sequelize  from 'sequelize';
import { ModelInterface } from '../interfaces/ModelInterface';


export interface HistoricoAttributes{
    id?: number;
    descricao?: string;
    user?: string;
   dataInicial: Date;
   dataFinal: Date;
   numHistorico: number;
   categoria: number;
   createdAt?: string;
   updatedAt?: string;
}

export interface HistoricoInstance extends Sequelize.Instance<HistoricoAttributes>, HistoricoAttributes {

}

export interface HistoricoModel extends BaseModelInterface, Sequelize.Model<HistoricoInstance, HistoricoAttributes>{

}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) : HistoricoModel => {

    const historico: HistoricoModel = 
          sequelize.define('Historico', {
               id:{
                  type: DataTypes.BIGINT,
                  allowNull: false,
                  primaryKey: true,
                  autoIncrement: true
               },
               descricao:{
                   type: DataTypes.STRING(200),
                   allowNull: false
               },
               dataInicial:{
                type: DataTypes.DATE,
                allowNull: true
            },
            dataFinal:{
                type: DataTypes.DATE,
                allowNull: true
            },
            numHistorico:{
                type: DataTypes.INTEGER,
                allowNull: true
            },
            categoria:{
                type: DataTypes.INTEGER,
                allowNull: true
            },
            user: {
                type: DataTypes.STRING,
                allowNull: false
            }

          }, {
              tableName: 'historico'
          });

          historico.associate = (models: ModelInterface): void =>{
              historico.belongsTo(models.User, {
                  foreignKey:{
                      allowNull: false,
                      field: 'user',
                      name: 'user'
                  }
              })
          }

          return historico;
}