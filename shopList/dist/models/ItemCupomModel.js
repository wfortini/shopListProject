"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const itemCupom = sequelize.define('ItemCupom', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        qtde: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        unidade: {
            type: DataTypes.STRING(2),
            allowNull: true
        },
        valorUnitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        valorTotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        cupom: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        tableName: 'itens_cupom'
    });
    itemCupom.associate = (models) => {
        itemCupom.belongsTo(models.Cupom, {
            foreignKey: {
                allowNull: false,
                field: 'cupom',
                name: 'cupom'
            }
        });
    };
    return itemCupom;
};
