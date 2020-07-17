const {
    DataTypes
  } = require('sequelize');
  // const model=require("./subject");
  // const relation = require('../../relation');
  module.exports = sequelize => {
    const attributes = {
      packageId: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: false,
        comment: null,
        field: "packageId"
      },
      PackageName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "CAT",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "PackageName"
      },
      Packageprice:{
        type:DataTypes.INTEGER(115),
        allowNull:false,
        defaultValue: 0,
        field:"PackagePrice"
      },
      PackageDesc: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "PackageDesc"
      },
       StopFlag:{
         type:DataTypes.INTEGER(11),
         defaultValue:"1",
         fiels:"StopFlag"
       },

        TestId: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "TestId"
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
      },
      videoId: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "videoId"
      },
      
      
    };
    // const options = {
    //   tableName: "course",
    //   comment: "",
    //   indexes: [{
    //     name: "questionId_idx",
    //     unique: false,
    //     type: "BTREE",
    //     fields: ["questionId"]
    //   }, {
    //     name: "videoId_idx",
    //     unique: false,
    //     type: "BTREE",
    //     fields: ["videoId"]
    //   }]
    // };
     const package = sequelize.define("package", attributes); 
    return package;
  };