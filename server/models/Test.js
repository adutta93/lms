const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    TestTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "test",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TestTitle"
    },
    exam_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "exam_type"
    },
    TestId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "Test_Id"
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
    
    Testlink: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TestLink"
    }
  };
  const options = {
    tableName: "Test",
    comment: "",
    indexes: []
  };
  const TestModel = sequelize.define("Test", attributes, options);
  return TestModel;
};