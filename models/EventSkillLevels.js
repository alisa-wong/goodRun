module.exports = function(sequelize, DataTypes) {
    let modelName = 'EventSkillLevels';
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
        skillLevelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'event_skill_levels'
    });

    return model
}