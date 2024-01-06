// teacher-model.js
const { DataTypes } = require('sequelize');

const Teacher = (sequelize)=>{
return sequelize.define('Teacher', {
  TeacherID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING,
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
  Cabin:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:'C-515'
  },
  
}, {
  // Disable timestamps
  timestamps: false,
});
};

module.exports = Teacher;
