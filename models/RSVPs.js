module.exports = function(sequelize, DataTypes) {
    let modelName = 'RSVPs';
    let columnDefinition = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        waitlisted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'rsvps'
    });

    return model
}