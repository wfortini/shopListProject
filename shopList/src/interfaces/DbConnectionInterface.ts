import { ModelInterface } from './ModelInterface';
import * as Sequelize from "sequelize";

export interface DbConnection extends ModelInterface{

    sequelize: Sequelize.Sequelize;
}