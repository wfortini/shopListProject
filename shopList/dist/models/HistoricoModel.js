"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const historico = sequelize.define('Historico', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        dataIncial: {
            type: DataTypes.DATE,
            allowNull: true
        },
        dataFinal: {
            type: DataTypes.DATE,
            allowNull: true
        },
        numHistorico: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        categoria: {
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
    historico.associate = (models) => {
        historico.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    };
    return historico;
};
