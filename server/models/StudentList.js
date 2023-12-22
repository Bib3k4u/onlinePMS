const { DataTypes } = require('sequelize');

const StudentList = (sequelize) => {
  return sequelize.define('studentList', {
    enrollmentNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    admissionNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    nameOfStudent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'studentList', // Explicitly specify the table name
  });
};

module.exports = StudentList;
