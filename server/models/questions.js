const {
  DataTypes
} = require('sequelize');
// const db = require('../db');
// const relation = require('../relation');
module.exports = sequelize => {
  const attributes = {
    questionId: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "questionId"
    }, chapterName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "test"
    
   
    },

    questionDesc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "questionDesc"
    },
    questionType: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "questionType"
    },
    QueimgId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "QueimgId"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_at"
    }
  };
  // const options = {
  //   tableName: "question",
  //   comment: "",
  //   indexes: [{
  //     name: "imageId_idx",
  //     unique: false,
  //     type: "BTREE",
  //     fields: ["QueimgId"]
  //   }]
  // };
  const QuestionModel = sequelize.define("question", attributes);
  return QuestionModel;
};