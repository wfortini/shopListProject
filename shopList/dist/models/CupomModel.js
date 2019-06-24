"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Cupom = sequelize.define('Cupom', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        razaoSocial: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        CNPJ: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        bairro: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        estado: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        cep: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        cidade: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        qtdeTotalItens: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        formaPG: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        valorPG: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        valorTotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        dataCompra: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nfce: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        historico: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        tableName: 'cupons'
    });
    Cupom.associate = (models) => {
        Cupom.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    };
    Cupom.associate = (models) => {
        Cupom.belongsTo(models.Historico, {
            foreignKey: {
                allowNull: false,
                field: 'historico',
                name: 'historico'
            }
        });
    };
    return Cupom;
};
