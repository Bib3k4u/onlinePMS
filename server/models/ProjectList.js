const {DataTypes} = require('sequelize');

const ProjectList = (sequelize) =>{
    return sequelize.define('projectList',{
        projectId:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull:false,
        },
        tile:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        members:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        guide:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        currentStatus:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        researPaper:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        patent:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        domain:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        branch:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        year:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },{
        tableName:'projects',
    
    });
}
module.exports = ProjectList;