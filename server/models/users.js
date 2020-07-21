const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
    //  1 = student ,2= admin ,3= creator,4=uploader,5= accountant
    user_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'student',
      enum: ['student', 'admin', 'creator', 'uploader', 'accountant'],
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'user_type',
    },
    email_Id: {
      type: DataTypes.STRING(245),
      allowNull: false,
      primaryKey: true,
      isEmail: { msg: 'not a valid email' },
      unique: {
        args: true,
        msg: 'email ad already in use!',
      },
      autoIncrement: false,
      comment: null,
      field: 'email_Id',
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      unique: {
        args: true,
        msg: 'username already in use!',
      },
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'username',
    },
    user_desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'user_desc',
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'password',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_at',
    },
    signup_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'signup_type',
    },
  };
  const options = {
    tableName: 'users',
    comment: '',
    indexes: [],
  };
  const UsersModel = sequelize.define('users', attributes, options);
  return UsersModel;
};
