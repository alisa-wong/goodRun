module.exports = function(sequelize, DataTypes) {
    let modelName = 'Players';
    let columnDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        position: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'players',
        timestamps: false
    });

    return model
}