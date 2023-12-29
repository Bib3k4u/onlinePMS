const {DataTypes} = require('sequelize');

const ProjectIDList = (sequelize) =>{
    return sequelize.define('projectIds',{
        enrollmentNumber:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull:false,
        },
        verfication:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        currentStatus:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        marks:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },);
}
module.exports = ProjectIDList;