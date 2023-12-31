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
            allowNull:true,
        },
        members:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        guide:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        currentStatus:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        researPaper:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        patent:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        domain:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        branch:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        year:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        semester:{
            type:DataTypes.STRING,
            allowNull:true
        }
    },{
        tableName:'projects',
    
    });
}
module.exports = ProjectList;