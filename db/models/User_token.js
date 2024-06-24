const {DataTypes} = require('sequelize');
const sequelize = require('../connection');

const UserToken = sequelize.define('UserToken',{
    token_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    }, {
    tableName: 'user_tokens',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
        

module.exports = UserToken;