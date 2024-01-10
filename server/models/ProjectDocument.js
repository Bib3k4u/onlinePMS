// task-model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');


const ProjectDocument = (sequelize)=>{
return sequelize.define('ProjectDocument', {
  DocumentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ProjectID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProjectTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'Not uploaded'
  },
  ProjectAbstract: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'Not uploaded'
  },
  ProjectPresentaion: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'Not uploaded'
    
  },
  ProjectReport: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:'Not uploaded'
  },
  ProjectResearchPaper: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:'Not uploaded',
  },
  ProjectLink:{
    type:DataTypes.STRING,
    allowNull:true,
    defaultValue:'Not uploaded'
  }
}, {
  // Disable timestamps
  timestamps: false,
});
};
module.exports = ProjectDocument;
