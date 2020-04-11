module.exports = function(sequelize, DataTypes) {
    let modelName = 'SkillLevels';
    let columnDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'skill_levels',
        timestamps: false
    });

    return model
}