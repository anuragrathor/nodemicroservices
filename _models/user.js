const { Sequelize, DataTypes } = require('sequelize');
const db = require("../_db/index");

const User = db.sequelize.define('User', {
  // Model attributes are defined here
  id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
  },
  parent_id: {
    type: DataTypes.BIGINT
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255)
    // allowNull defaults to true
  },
  first_name: {
    type: DataTypes.STRING(255)
  },
  last_name: {
    type: DataTypes.STRING(255)
  },
  user_slug: {
    type: DataTypes.STRING(255)
  },
  mobile: {
    type: DataTypes.STRING(255)
  },
  otp_number: {
    type: DataTypes.STRING(255),
    defaultValue: 0
  },
  otp_exp_time: {
    type: DataTypes.STRING(255),
    defaultValue: 0
  },
  type: {
    type: DataTypes.INTEGER(11),
    defaultValue: 0
  },
  forget_pass_code: {
    type: DataTypes.STRING(255)
  },
  forget_pass_code_exptime: {
    type: DataTypes.STRING(255)
  },
  status: {
    type: DataTypes.INTEGER(11),
    defaultValue:'1'
  },
  avatar: {
    type: DataTypes.STRING(255),
    defaultValue:'dotcompal'
  },
  send_otp: {
    type: DataTypes.INTEGER(11)
  },
  admin_status: {
    type: DataTypes.INTEGER(11),
    defaultValue:'1'
  },
  current_solution_id: {
    type: DataTypes.INTEGER(11),
    defaultValue:'2'
  },
  current_solution_name: {
    type: DataTypes.STRING(255),
    defaultValue:'dotcompal'
  }
}, {

    //tableName: 'videos'         // Forcefully give table name if we need
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
