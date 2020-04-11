const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    let modelName = 'Events';
    let columnDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'events'
    });

    return model
}