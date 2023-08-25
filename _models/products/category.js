const { DataTypes } = require("sequelize");
const db = require("../../_db");


const Category = db.sequelize.define('Category', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255)
    },
    image: {
        type: DataTypes.STRING(255)
    },
    imageId: {
      type: DataTypes.STRING(255)
    }

});


Category.sync().then(() => {
    console.log('Category Table Created Successfully');
}).catch((error)=> {
    console.log('Unable to create table', error);
})


module.exports = Category;