module.exports = function(sequelize, DataTypes) {
    let modelName = 'EventOrganizers';
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
        organizerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'event_organizers'
    });

    return model
}