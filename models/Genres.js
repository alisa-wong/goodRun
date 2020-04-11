module.exports = function(sequelize, DataTypes) {
    let modelName = 'Genres';
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
        tableName: 'genres',
        timestamps: false
    });

    return model;
}