// student-model.js
const { DataTypes, STRING } = require('sequelize');


const Student = (sequelize)=>{
return sequelize.define('Student', {
  StudentID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AdmissionNumber: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  Phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  EnrollmentNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Year:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  Semester:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  Course:{
   type:DataTypes.STRING,
   allowNull:false,  
  },
  Branch:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  Session:{
  type:DataTypes.STRING,
  allowNull:false,
  },
  Password:{
    type:STRING,
    allowNull:false,
    defaultValue:'Gu@12345'
  }

}, {
  // Disable timestamps
  timestamps: false,
});
};

module.exports = Student;
