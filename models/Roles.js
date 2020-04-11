module.exports = function(sequelize, DataTypes) {
    let modelName = 'Roles';
    let columnDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        skillLevelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genreId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'roles',
        timestamps: false
    });

    return model
}