require('dotenv').config();

module.exports = {
    host: "localhost",
    user: "root",
    password: "",
    db: 'dotcompal',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}