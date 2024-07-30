const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const dbHost = process.env.NODE_ENV === 'production' ? process.env.INTERNAL_DB_HOST : process.env.EXTERNAL_DB_HOST;
const dbPort = process.env.NODE_ENV === 'production' ? process.env.INTERNAL_DB_PORT : process.env.EXTERNAL_DB_PORT;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    // host: process.env.DB_HOST,
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Esto es común para muchas configuraciones de PostgreSQL en la nube
        }
    },
});

module.exports = sequelize;
