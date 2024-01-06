// project-member-model.js
const { DataTypes } = require('sequelize');


const ProjectMember =(sequelize)=>{ 
return sequelize.define('ProjectMember', {
  ProjectMemberID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ProjectID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Projects',
      key: 'ProjectID',
    },
  },
  StudentID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Students',
      key: 'AdmissionNumber',
    },
  },
  Review1Marks: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  Review2Marks: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  CurrentStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Not accepted', // Corrected the defaultValue syntax
  },
}, {
  // Disable timestamps
  timestamps: false,
});
};

module.exports = ProjectMember;
