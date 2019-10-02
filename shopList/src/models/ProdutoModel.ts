import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import * as Sequelize  from 'sequelize';

export interface ProdutoAttributes{

    id?: number;
    ean: string;
    desc_1: string;
    desc_2?: string;
    desc_3?: string;
    codigo?: string;
    valor: number;
    image?: string;
    dataUpdate?: string;
    ultimoValor: number;
    
    nomeFantasia: string;
    razaoSocial: string;
    CNPJ: string;
    endereco: string;
    bairro: string;
    estado: string;
    cep: string;
    cidade: string;
    createdAt?: string;
    updated?: string;

}
export interface ProdutoInstance extends Sequelize.Instance<ProdutoAttributes>, ProdutoAttributes {}

export interface ProdutoModel extends BaseModelInterface, Sequelize.Model<ProdutoModel, ProdutoAttributes>{}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) : ProdutoModel => {

    const Produto: ProdutoModel = 
          sequelize.define('Produto', {
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
               ean:{
                   type: DataTypes.STRING,
                   allowNull: true
               },
               desc_1:{
                   type: DataTypes.STRING(150),
                   allowNull: true
               },
               desc_2:{
                type: DataTypes.STRING(150),
                allowNull: true
               },
               desc_3:{
                type: DataTypes.STRING(150),
                allowNull: true
               },
               image:{
                   type: DataTypes.STRING,
                   allowNull: true
               },
               dataUpdate:{
                   type: DataTypes.STRING,
                   allowNull: true
               },
               ultimoValor:{
                   type:DataTypes.DECIMAL(10,2),
                   allowNull: true
               },
               valor:{
                   type: DataTypes.DECIMAL(10,2),
                   allowNull: false
               },
               nomeFantasia:{
                   type: DataTypes.STRING(150),
                   allowNull: true
               },
               razaoSocial:{
                   type: DataTypes.STRING(128),
                   allowNull: true
               },
               CNPJ:{
                type: DataTypes.STRING,
                allowNull: true,                
            },
            endereco:{
                type: DataTypes.STRING(300),
                allowNull: true
            },
            bairro:{
                type: DataTypes.STRING(500),
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
            }           

          }, {
              tableName: 'produtos'
          });

         
        return Produto;
}