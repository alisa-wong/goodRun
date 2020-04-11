module.exports = function(sequelize, DataTypes) {
    let modelName = 'TimeIntervals';
    let columnDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'time_intervals'
    });

    return model
}