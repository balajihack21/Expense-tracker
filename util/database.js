const Sequelize=require('sequelize')

const sequelize=new Sequelize(process.env.DB_SCHEMA,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:'localhost',
    dialect:'mariadb'
}
)

module.exports=sequelize