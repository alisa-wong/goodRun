module.exports = function(sequelize, DataTypes) {
    let modelName = 'Courts';
    let columnDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        indoor: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        floorType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'courts'
    });

    return model;
}