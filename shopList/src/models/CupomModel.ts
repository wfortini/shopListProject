import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import * as Sequelize  from 'sequelize';
import { ModelInterface } from '../interfaces/ModelInterface';

export interface CupomAttributes{

    id?: number;
    razaoSocial?: string;
    CNPJ?: string;
    endereco?: string;
    bairro?: string;
    estado?: string;
    cep?: string;
    cidade?: string;
    qtdeTotalItens?: number;
    desconto: number;
    formaPG: string;
    valorTotal: number;
    valorPG?: number;
    dataCompra?: Date;  
    user?: string;
    historico: number;
    nfce?: string; 
    createdAt?: string;
    updated?: string;

}
export interface CupomInstance extends Sequelize.Instance<CupomAttributes>, CupomAttributes {}

export interface CupomModel extends BaseModelInterface, Sequelize.Model<CupomInstance, CupomAttributes>{}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) : CupomModel => {

    const Cupom: CupomModel = 
          sequelize.define('Cupom', {
               id:{
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
               },
               razaoSocial:{
                   type: DataTypes.STRING(128),
                   allowNull: false
               },
               CNPJ:{
                type: DataTypes.STRING,
                allowNull: false,                
            },
            endereco:{
                type: DataTypes.STRING(1000),
                allowNull: true
            },
            bairro:{
                type: DataTypes.STRING(100),
                allowNull: true
            },
            estado:{
                type: DataTypes.STRING(10),
                allowNull: true
            },
            cep:{
                type: DataTypes.STRING(50),
                allowNull: true
            },
            cidade:{
                type: DataTypes.STRING(50),
                allowNull: true
            },
            qtdeTotalItens:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            formaPG:{
                type: DataTypes.STRING(50),
                allowNull: false
            },
            valorPG:{
                type: DataTypes.DECIMAL(10,2),
                allowNull: false
            },
            valorTotal:{
                type: DataTypes.DECIMAL(10,2),
                allowNull: false
            },
            dataCompra:{
                type: DataTypes.DATE,
                allowNull: false
            },
            nfce:{
                type: DataTypes.STRING,
                allowNull: true
            },
            user:{
                type: DataTypes.STRING,
                allowNull: false
            },
            historico:{
                type: DataTypes.BIGINT,
                allowNull: false
            }

          }, {
              tableName: 'cupons'
          });

          Cupom.associate = (models: ModelInterface): void =>{
            Cupom.belongsTo(models.User, {
                foreignKey:{
                    allowNull: false,
                    field: 'user',
                    name: 'user'
                }
            })
        }
        Cupom.associate = (models: ModelInterface): void =>{
            Cupom.belongsTo(models.Historico, {
                foreignKey:{
                    allowNull: false,
                    field: 'historico',
                    name: 'historico'
                }
            })
        }

        return Cupom;
}