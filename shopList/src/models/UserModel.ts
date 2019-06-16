import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import * as Sequelize  from 'sequelize';

export interface UserAttributes{

    id?: string;
    name?: string;
    username?: string;
    birthDate: Date;
    address: string;
    zipCode: string;
    state: string;
    city: string;
    addressNumber: string;
    password: string;
    createdAt?: string;
    updated?: string;

}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {

}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes>{

}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) : UserModel => {

    const User: UserModel = 
          sequelize.define('User', {
               id:{
                  type: DataTypes.STRING,
                  allowNull: false,
                  primaryKey: true
               },
               name:{
                   type: DataTypes.STRING(128),
                   allowNull: false
               },
               username:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            birthDate:{
                type: DataTypes.DATE,
                allowNull: true
            },
            address:{
                type: DataTypes.STRING(500),
                allowNull: true
            },
            zipCode:{
                type: DataTypes.STRING(10),
                allowNull: true
            },
            state:{
                type: DataTypes.STRING(50),
                allowNull: true
            },
            city:{
                type: DataTypes.STRING(50),
                allowNull: true
            },
            addressNumber:{
                type: DataTypes.STRING(10),
                allowNull: true
            },
            password:{
                type: DataTypes.STRING(50),
                allowNull: true
            }

          }, {
              tableName: 'users'
          });

          return User;
}