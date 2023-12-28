const {DataTypes} = require('sequelize');

const Remarks = (sequelize) =>{
    return sequelize.define('remarksList',{
        projectId:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull:false,
        },
        remarks:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },{
        tableName:'remarks',
    
    });
}
module.exports = ProjectList;