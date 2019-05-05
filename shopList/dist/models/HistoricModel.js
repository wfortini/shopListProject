"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const historic = sequelize.define('Historic', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false
        }
    }, {
        tableName: 'historical'
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
