module.exports = function(sequelize, DataTypes) {
    let modelName = 'Venues';
    let columnDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        regionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        streetAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        locationNotes: {
            type: DataTypes.TEXT,
            allowNull: false
        },

    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'venues'
    });

    return model
}