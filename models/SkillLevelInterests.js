module.exports = function(sequelize, DataTypes) {
    let modelName = 'SkillLevelInterests';
    let columnDefinition = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        skillLevelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'skill_level_interests',
        timestamps: false
    });

    return model
}