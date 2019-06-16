"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const historic = sequelize.define('Historico', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        dataInicial: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dataFinal: {
            type: DataTypes.DATE,
            allowNull: true
        },
        numHistorico: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoria: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'historico'
    });
    historic.associate = (models) => {
        historic.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    };
    return historic;
};
