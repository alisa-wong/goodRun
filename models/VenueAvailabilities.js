module.exports = function(sequelize, DataTypes) {
    let modelName = 'VenueAvailabilities';
    let columnDefinition = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        venueId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        timeIntervalId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'venue_availabilities'
    });

    return model
}