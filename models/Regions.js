module.exports = function(sequelize, DataTypes) {
    let modelName = 'Regions';
    let columnDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'regions',
        timestamps: false
    });

    return model
}