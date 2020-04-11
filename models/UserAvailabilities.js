module.exports = function(sequelize, DataTypes) {
    let modelName = 'UserAvailabilities';
    let columnDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dayOfWeek: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        startHour: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        startMinute: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        endHour: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        endMinute: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'user_availabilities'
    });

    return model
}