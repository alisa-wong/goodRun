module.exports = function(sequelize, DataTypes) {
    let modelName = 'Referrals';
    let columnDefinition = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        referrerUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        referredRoleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'referrals'
    });

    return model
}