// project-member-model.js
const { DataTypes } = require('sequelize');


const Admin =(sequelize)=>{ 
return sequelize.define('Admin', {
  AdminID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Name:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  Password:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:'Gu@12345'
  }

  
}, {
  // Disable timestamps
  timestamps: false,
});
};

module.exports = Admin;
