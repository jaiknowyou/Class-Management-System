const {Sequelize} = require('sequelize')
require('./config')
require('./connection')

// DB Config initialisation
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD,{
    host: HOSTNAME,
    dialect: 'mysql',
    port: 3306,
})

// DB Connect
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection with Sequelize Success');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.afterDisconnect((callback) => {
    console.log('Disconnected from database');
});

module.exports = sequelize

// CREATE TABLE `bytespeedtestdb`.`Contact` (`id` SERIAL NOT NULL , `phoneNumber` VARCHAR(32) NULL , `email` VARCHAR(32) NULL , `linkedId` INT NULL , `linkPrecedence` ENUM('primary','secondary') NOT NULL , `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updatedAt` DATETIME on update CURRENT_TIMESTAMP NULL , `deletedAt` DATETIME NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
