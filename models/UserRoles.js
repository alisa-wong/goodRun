module.exports = function(sequelize, DataTypes) {
    let modelName = 'UserRoles';
    let columnDefinition = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'user_roles'
    });

    return model
}