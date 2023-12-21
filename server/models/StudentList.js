const { DataTypes } = require('sequelize');

const StudentList = (sequelize) => {
  return sequelize.define('StudentList', {
    EnrollmentNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    AdmissionNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'StudentList', // Explicitly specify the table name
  });
};

module.exports = StudentList;
