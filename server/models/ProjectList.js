// project-model.js
const { DataTypes } = require("sequelize");

const Project = (sequelize) => {
  return sequelize.define(
    "Project",
    {
      ProjectID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      ProjectNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      GuideID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Teachers",
          key: "TeacherID",
        },
      },
      ReviewerID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Teachers",
          key: "TeacherID",
        },
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Semester: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ProjectTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "#######",
      },
      ProjectAbstract: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "######",
      },
    },
    {
      // Disable timestamps
      timestamps: false,
      hooks: {
        // Hook to automatically generate ProjectID by combining a prefix and ProjectNumber
        beforeValidate: (project) => {
          project.ProjectID = `BT-${project.ProjectNumber}`;
        },
      },
    }
  );
};

module.exports = Project;
