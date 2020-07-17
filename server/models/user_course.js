const {
  DataTypes
} = require('sequelize');


module.exports = sequelize => {
  const attributes = {
    couseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "couseId"
    },
    usrId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "usrId",
      references: {
        key: "userId",
        model: "user_model"
      }
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "paymentId",
      references: {
        key: "paymentId",
        model: "payment_model"
      }
    }
  };
  const options = {
    tableName: "user_course",
    comment: "",
    indexes: [{
      name: "paymentId_idx",
      unique: false,
      type: "BTREE",
      fields: ["paymentId"]
    }]
  };
  const UserCourseModel = sequelize.define("user_course", attributes, options);
  return UserCourseModel;
};