const { Sequelize, DataTypes } = require('sequelize');
const db = require("../_db/index");

const User = db.sequelize.define('User', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING(222),
    allowNull: false
  }
  ,
  email: {
    type: DataTypes.STRING(222),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(222)
    // allowNull defaults to true
  }
}, {

    //tableName: 'user'         // Forcefully give table name
    //freezeTableName: true     // tables will use the same name as the model name  not use plural
  
});


//This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync().then(() => {
  console.log('User table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});


// `sequelize.define` also returns the model
console.log(User === db.sequelize.models.User); // true


module.exports = User;
