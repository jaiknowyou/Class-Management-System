const {Sequelize} = require('sequelize')
require('./config')

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