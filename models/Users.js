const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    let modelName = 'Users';
    let columnDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        accessCode: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        gradYear: {
            type: DataTypes.STRING,
            allowNull: true
        },
        school: {
            type: DataTypes.STRING,
            allowNull: true
        },
        homeRegionId: {
            type: DataTypes.INTEGER, //regionId
            allowNull: true
        },
        workRegionId: {
            type: DataTypes.INTEGER, //regionId
            allowNull: true
        },
        willTravel: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }

    let model = sequelize.define(modelName, columnDefinition, {
        tableName: 'users',
        hooks: {
            beforeCreate: (user) => {
                if (user.password) {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
      }
    });

    model.prototype.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return model
}