// task-model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');


const Task = (sequelize)=>{
return sequelize.define('Task', {
  TaskID: {
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
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AssigneeID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Students',
      key: 'AdmissionNumber',
    },
  },
  AssignedByTeacherID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Teachers',
      key: 'TeacherID',
    },
  },
  DueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:'Not completed',
  },
}, {
  // Disable timestamps
  timestamps: false,
});
};
module.exports = Task;
